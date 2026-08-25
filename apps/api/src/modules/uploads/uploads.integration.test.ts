import { randomUUID } from 'node:crypto';
import { UserRole } from '@prisma/client';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('cloudinary', () => ({
  v2: {
    config: vi.fn(),
    uploader: {
      upload_stream: (_options: unknown, callback: (error: unknown, result: unknown) => void) => ({
        end: () =>
          callback(null, { secure_url: 'https://res.cloudinary.com/demo/image/upload/test.png' }),
      }),
    },
  },
}));

const integrationDescribe = process.env.RUN_INTEGRATION_TESTS === 'true' ? describe : describe.skip;

function csrfCookie(setCookie: string[] | string | undefined) {
  const cookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  const cookie = cookies.find((value) => value.startsWith('abou_csrf='));
  return cookie?.split(';', 1)[0]?.slice('abou_csrf='.length);
}

function uniqueEmail(prefix: string) {
  return `${prefix}-${randomUUID()}@example.com`;
}

integrationDescribe('admin uploads PostgreSQL integration', () => {
  const password = 'StrongPassword123!';
  let adminId = '';
  let clientId = '';
  let adminEmail = '';
  let clientEmail = '';

  beforeEach(async () => {
    const { prisma } = await import('../../lib/prisma.js');
    const { hashPassword } = await import('../../lib/password.js');
    adminEmail = uniqueEmail('admin-uploads');
    clientEmail = uniqueEmail('client-uploads');
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: await hashPassword(password),
        emailVerifiedAt: new Date(),
        role: UserRole.ADMIN,
        profile: { create: { fullName: 'Integration Admin' } },
      },
    });
    const client = await prisma.user.create({
      data: {
        email: clientEmail,
        passwordHash: await hashPassword(password),
        emailVerifiedAt: new Date(),
        role: UserRole.CLIENT,
        profile: { create: { fullName: 'Integration Client' } },
      },
    });
    adminId = admin.id;
    clientId = client.id;
  });

  afterEach(async () => {
    const { prisma } = await import('../../lib/prisma.js');
    await prisma.session.deleteMany({ where: { userId: { in: [adminId, clientId] } } });
    await prisma.clientProfile.deleteMany({ where: { userId: { in: [adminId, clientId] } } });
    await prisma.user.deleteMany({ where: { id: { in: [adminId, clientId] } } });
  });

  async function signedIn(email: string) {
    const { app } = await import('../../app.js');
    const agent = request.agent(app);
    const csrfResponse = await agent.get('/api/v1/auth/csrf').expect(200);
    const csrfBeforeLogin = csrfResponse.body.csrfToken as string;
    const login = await agent
      .post('/api/v1/auth/login')
      .set('X-CSRF-Token', csrfBeforeLogin)
      .send({ email, password })
      .expect(200);
    return { agent, csrf: csrfCookie(login.headers['set-cookie']) ?? '' };
  }

  it('uploads an image to Cloudinary and returns its secure URL', async () => {
    const admin = await signedIn(adminEmail);

    const response = await admin.agent
      .post('/api/v1/admin/uploads/image')
      .set('X-CSRF-Token', admin.csrf)
      .attach('file', Buffer.from('fake-png-bytes'), {
        filename: 'logo.png',
        contentType: 'image/png',
      })
      .expect(201);

    expect(response.body.secure_url).toBe('https://res.cloudinary.com/demo/image/upload/test.png');
  });

  it('rejects uploads from non-admin users', async () => {
    const client = await signedIn(clientEmail);

    await client.agent
      .post('/api/v1/admin/uploads/image')
      .set('X-CSRF-Token', client.csrf)
      .attach('file', Buffer.from('fake-png-bytes'), {
        filename: 'logo.png',
        contentType: 'image/png',
      })
      .expect(403);
  });

  it('rejects a request with no file attached', async () => {
    const admin = await signedIn(adminEmail);

    await admin.agent
      .post('/api/v1/admin/uploads/image')
      .set('X-CSRF-Token', admin.csrf)
      .expect(400);
  });

  it('rejects a disallowed mimetype', async () => {
    const admin = await signedIn(adminEmail);

    await admin.agent
      .post('/api/v1/admin/uploads/image')
      .set('X-CSRF-Token', admin.csrf)
      .attach('file', Buffer.from('not-an-image'), {
        filename: 'doc.pdf',
        contentType: 'application/pdf',
      })
      .expect(400);
  });

  it('rejects a request missing the CSRF token', async () => {
    const admin = await signedIn(adminEmail);

    await admin.agent
      .post('/api/v1/admin/uploads/image')
      .attach('file', Buffer.from('fake-png-bytes'), {
        filename: 'logo.png',
        contentType: 'image/png',
      })
      .expect(403);
  });
});
