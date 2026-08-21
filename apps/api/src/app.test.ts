import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from './app.js';

describe('API foundation', () => {
  it('reports health', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', service: 'api' });
  });

  it('reports unavailable readiness when the database check fails', async () => {
    const response = await request(app).get('/api/v1/health/readiness');
    expect([200, 503]).toContain(response.status);
    expect(response.body.checks.database).toMatch(/ok|unavailable/);
  });

  it('returns a structured 404 response', async () => {
    const response = await request(app).get('/api/v1/missing');

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
    expect(response.body.error.requestId).toEqual(expect.any(String));
  });

  it('returns validation errors as 400 responses', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({});

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.requestId).toEqual(expect.any(String));
  });

  it('issues a pre-session CSRF token and rejects login without it', async () => {
    const csrf = await request(app).get('/api/v1/auth/csrf').expect(200);
    expect(csrf.body.csrfToken).toEqual(expect.any(String));
    expect(csrf.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('abou_csrf=')]),
    );

    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'client@example.com', password: 'StrongPassword123!' });
    expect(login.status).toBe(403);
    expect(login.body.error.code).toBe('INVALID_CSRF');
  });
});
