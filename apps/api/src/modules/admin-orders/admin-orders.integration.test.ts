import { randomUUID } from 'node:crypto';
import { UserRole } from '@prisma/client';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { app } from '../../app.js';
import { hashPassword } from '../../lib/password.js';
import { prisma } from '../../lib/prisma.js';

const integrationDescribe = process.env.RUN_INTEGRATION_TESTS === 'true' ? describe : describe.skip;

function csrfCookie(setCookie: string[] | string | undefined) {
  const cookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  const cookie = cookies.find((value) => value.startsWith('abou_csrf='));
  return cookie?.split(';', 1)[0]?.slice('abou_csrf='.length);
}

function uniqueEmail(prefix: string) {
  return `${prefix}-${randomUUID()}@example.com`;
}

integrationDescribe('admin order PostgreSQL integration', () => {
  const password = 'StrongPassword123!';
  let adminId = '';
  let clientId = '';
  let adminEmail = '';
  let clientEmail = '';

  beforeEach(async () => {
    adminEmail = uniqueEmail('admin-orders');
    clientEmail = uniqueEmail('client-orders');
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
    const orders = await prisma.order.findMany({ where: { clientId }, select: { id: true } });
    const orderIds = orders.map((order) => order.id);
    await prisma.orderClientResponse.deleteMany({ where: { orderId: { in: orderIds } } });
    await prisma.orderInternalNote.deleteMany({ where: { orderId: { in: orderIds } } });
    await prisma.orderStatusHistory.deleteMany({ where: { orderId: { in: orderIds } } });
    await prisma.order.deleteMany({ where: { id: { in: orderIds } } });
    await prisma.auditLog.deleteMany({ where: { actorUserId: { in: [adminId, clientId] } } });
    await prisma.session.deleteMany({ where: { userId: { in: [adminId, clientId] } } });
    await prisma.clientProfile.deleteMany({ where: { userId: { in: [adminId, clientId] } } });
    await prisma.user.deleteMany({ where: { id: { in: [adminId, clientId] } } });
  });

  async function signedIn(email: string) {
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

  it('lets admins review, transition, annotate, and inspect an order', async () => {
    const client = await signedIn(clientEmail);
    const admin = await signedIn(adminEmail);
    const created = await client.agent
      .post('/api/v1/orders')
      .set('X-CSRF-Token', client.csrf)
      .send({
        fullName: 'Integration Client',
        phoneNumber: '+905015959880',
        specialization: 'medicine',
      })
      .expect(201);
    const orderId = created.body.order.id as string;
    const reference = created.body.order.reference as string;

    await admin.agent.get('/api/v1/admin/orders/metrics').expect(200);
    const list = await admin.agent
      .get('/api/v1/admin/orders')
      .query({ search: reference, page: 1, pageSize: 10 })
      .expect(200);
    expect(list.body.items).toHaveLength(1);

    await client.agent.get('/api/v1/admin/orders').expect(403);
    await admin.agent
      .post(`/api/v1/admin/orders/${orderId}/status`)
      .set('X-CSRF-Token', admin.csrf)
      .send({ to: 'CONTACTED', clientVisibleMessage: 'We are reviewing your request.' })
      .expect(200);
    await admin.agent
      .post(`/api/v1/admin/orders/${orderId}/internal-notes`)
      .set('X-CSRF-Token', admin.csrf)
      .send({ body: 'Call the client tomorrow.' })
      .expect(201);

    const detail = await admin.agent.get(`/api/v1/admin/orders/${orderId}`).expect(200);
    expect(detail.body.order.status).toBe('CONTACTED');
    expect(detail.body.order).not.toHaveProperty('assignedAdmin');
    expect(detail.body.order.statusHistory.at(-1)).toMatchObject({
      toStatus: 'CONTACTED',
      clientVisibleMessage: 'We are reviewing your request.',
    });
    expect(detail.body.order.internalNotes.at(-1).body).toBe('Call the client tomorrow.');

    await admin.agent
      .post(`/api/v1/admin/orders/${orderId}/status`)
      .set('X-CSRF-Token', admin.csrf)
      .send({ to: 'NEW' })
      .expect(409);
  });
});
