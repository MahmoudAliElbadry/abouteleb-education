import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from './app.js';

describe('API foundation', () => {
  it('reports health', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', service: 'api' });
  });

  it('returns a structured 404 response', async () => {
    const response = await request(app).get('/api/v1/missing');

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });
});
