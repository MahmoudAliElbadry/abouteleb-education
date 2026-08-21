import { randomUUID } from 'node:crypto';
import { UserStatus } from '@prisma/client';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { app } from '../../app.js';
import { prisma } from '../../lib/prisma.js';
import { clearDevelopmentMailbox, getDevelopmentMailbox } from './email.provider.js';

const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === 'true';
const integrationDescribe = runIntegrationTests ? describe : describe.skip;

function uniqueEmail() {
  return `integration-${randomUUID()}@example.com`;
}

function csrfToken(setCookie: string[] | string | undefined) {
  const cookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  const csrfCookie = cookies.find((cookie) => cookie.startsWith('abou_csrf='));
  if (!csrfCookie) return undefined;
  const nameValue = csrfCookie.split(';', 1)[0];
  return nameValue?.slice('abou_csrf='.length);
}

async function issueCsrf(agent: ReturnType<typeof request.agent>) {
  const response = await agent.get('/api/v1/auth/csrf').expect(200);
  return response.body.csrfToken as string;
}

async function cleanupDatabase() {
  await prisma.auditLog.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationChallenge.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.user.deleteMany();
}

integrationDescribe('authentication PostgreSQL integration', () => {
  beforeEach(async () => {
    clearDevelopmentMailbox();
    await cleanupDatabase();
  });

  afterEach(async () => {
    await cleanupDatabase();
  });

  it('registers, verifies, logs in, resolves a session, and logs out with CSRF', async () => {
    const email = uniqueEmail();
    const password = 'StrongPassword123!';
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/register')
      .send({ fullName: 'Integration Client', email, password, consentAccepted: true })
      .expect(201);
    const verification = getDevelopmentMailbox().at(-1);
    expect(verification).toMatchObject({ recipient: email, purpose: 'EMAIL_VERIFY' });

    await agent
      .post('/api/v1/auth/verify-email')
      .send({ email, code: verification?.code })
      .expect(200);

    const csrfBeforeLogin = await issueCsrf(agent);
    const login = await agent
      .post('/api/v1/auth/login')
      .set('X-CSRF-Token', csrfBeforeLogin)
      .send({ email, password })
      .expect(200);
    const csrf = csrfToken(login.headers['set-cookie']);
    expect(csrf).toEqual(expect.any(String));

    await agent.get('/api/v1/auth/session').expect(200);
    await agent
      .post('/api/v1/auth/logout')
      .set('X-CSRF-Token', csrf ?? '')
      .expect(204);
    await agent.get('/api/v1/auth/session').expect(401);
  });

  it('safely handles duplicates, rejects unverified and disabled accounts, and records redacted audit data', async () => {
    const email = uniqueEmail();
    const password = 'StrongPassword123!';

    await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Integration Client', email, password, consentAccepted: true })
      .expect(201);
    await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Integration Client', email, password, consentAccepted: true })
      .expect(409)
      .expect(({ body }) => expect(body.error.code).toBe('ACCOUNT_EXISTS'));
    const loginAgent = request.agent(app);
    const csrfBeforeLogin = await issueCsrf(loginAgent);
    await loginAgent
      .post('/api/v1/auth/login')
      .set('X-CSRF-Token', csrfBeforeLogin)
      .send({ email, password })
      .expect(403);

    const verification = getDevelopmentMailbox().at(-1);
    await request(app)
      .post('/api/v1/auth/verify-email')
      .send({ email, code: verification?.code })
      .expect(200);
    await prisma.user.update({ where: { email }, data: { status: UserStatus.DISABLED } });
    await loginAgent
      .post('/api/v1/auth/login')
      .set('X-CSRF-Token', csrfBeforeLogin)
      .send({ email, password })
      .expect(401);

    const logs = await prisma.auditLog.findMany();
    expect(logs.some((log) => log.action === 'auth.registration.completed')).toBe(true);
    expect(logs.some((log) => log.action === 'auth.email.verified')).toBe(true);
    expect(JSON.stringify(logs)).not.toContain(password);
    expect(JSON.stringify(logs)).not.toContain(verification?.code ?? 'unavailable-code');
  });

  it('invalidates every session when a password reset succeeds', async () => {
    const email = uniqueEmail();
    const password = 'StrongPassword123!';
    const replacementPassword = 'ReplacementPassword123!';
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/register')
      .send({ fullName: 'Integration Client', email, password, consentAccepted: true })
      .expect(201);
    const verification = getDevelopmentMailbox().at(-1);
    await agent
      .post('/api/v1/auth/verify-email')
      .send({ email, code: verification?.code })
      .expect(200);
    const csrfBeforeLogin = await issueCsrf(agent);
    await agent
      .post('/api/v1/auth/login')
      .set('X-CSRF-Token', csrfBeforeLogin)
      .send({ email, password })
      .expect(200);
    await agent.post('/api/v1/auth/forgot-password').send({ email }).expect(200);
    const reset = getDevelopmentMailbox().at(-1);
    await agent
      .post('/api/v1/auth/reset-password')
      .send({ email, code: reset?.code, newPassword: replacementPassword })
      .expect(200);

    await agent.get('/api/v1/auth/session').expect(401);
    const replacementAgent = request.agent(app);
    const replacementCsrf = await issueCsrf(replacementAgent);
    await replacementAgent
      .post('/api/v1/auth/login')
      .set('X-CSRF-Token', replacementCsrf)
      .send({ email, password: replacementPassword })
      .expect(200);
  });
});
