import { randomUUID } from 'node:crypto';
import { UserRole } from '@prisma/client';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { app } from '../../app.js';
import { prisma } from '../../lib/prisma.js';
import { hashPassword } from '../../lib/password.js';

const integrationDescribe = process.env.RUN_INTEGRATION_TESTS === 'true' ? describe : describe.skip;

function email() {
  return `orders-${randomUUID()}@example.com`;
}
function csrfCookie(setCookie: string[] | string | undefined) {
  const cookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  const cookie = cookies.find((value) => value.startsWith('abou_csrf='));
  if (!cookie) return undefined;
  return cookie.split(';', 1)[0]?.slice('abou_csrf='.length);
}

integrationDescribe('client order integration', () => {
  let userId = '';
  let userEmail = '';
  const password = 'StrongPassword123!';

  beforeEach(async () => {
    userEmail = email();
    const user = await prisma.user.create({
      data: {
        email: userEmail,
        passwordHash: await hashPassword(password),
        emailVerifiedAt: new Date(),
        role: UserRole.CLIENT,
        profile: { create: { fullName: 'Order Test Client' } },
      },
    });
    userId = user.id;
  });

  afterEach(async () => {
    const orders = await prisma.order.findMany({
      where: { clientId: userId },
      select: { id: true },
    });
    await prisma.orderClientResponse.deleteMany({
      where: { orderId: { in: orders.map((order) => order.id) } },
    });
    await prisma.orderStatusHistory.deleteMany({
      where: { orderId: { in: orders.map((order) => order.id) } },
    });
    await prisma.order.deleteMany({ where: { clientId: userId } });
    await prisma.user.delete({ where: { id: userId } });
  });

  async function signedInAgent() {
    const agent = request.agent(app);
    const login = await agent
      .post('/api/v1/auth/login')
      .send({ email: userEmail, password })
      .expect(200);
    return { agent, csrf: csrfCookie(login.headers['set-cookie']) ?? '' };
  }

  it('creates a NEW order, records history, and cancels it once', async () => {
    const { agent, csrf } = await signedInAgent();
    const created = await agent
      .post('/api/v1/orders')
      .set('X-CSRF-Token', csrf)
      .send({
        fullName: 'Order Test Client',
        phoneNumber: '+905015959880',
        specialization: 'medicine',
      })
      .expect(201);
    expect(created.body.order.status).toBe('NEW');
    const orderId = created.body.order.id as string;
    await agent.post(`/api/v1/orders/${orderId}/cancel`).set('X-CSRF-Token', csrf).expect(204);
    await agent.post(`/api/v1/orders/${orderId}/cancel`).set('X-CSRF-Token', csrf).expect(409);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { statusHistory: true },
    });
    expect(order?.closedAt).toBeTruthy();
    expect(order?.statusHistory).toHaveLength(2);
  });

  it('returns a response receipt once and rejects a duplicate', async () => {
    const { agent, csrf } = await signedInAgent();
    const created = await agent
      .post('/api/v1/orders')
      .set('X-CSRF-Token', csrf)
      .send({
        fullName: 'Order Test Client',
        phoneNumber: '+905015959880',
        specialization: 'medicine',
      })
      .expect(201);
    const orderId = created.body.order.id as string;
    await prisma.order.update({ where: { id: orderId }, data: { status: 'WAITING_FOR_CLIENT' } });
    const response = await agent
      .post(`/api/v1/orders/${orderId}/responses`)
      .set('X-CSRF-Token', csrf)
      .send({ body: 'Here is the requested information.' })
      .expect(201);
    expect(response.body.response.body).toBe('Here is the requested information.');
    await agent
      .post(`/api/v1/orders/${orderId}/responses`)
      .set('X-CSRF-Token', csrf)
      .send({ body: 'Duplicate' })
      .expect(409);
  });
});
