import { describe, expect, it } from 'vitest';
import { healthResponseSchema } from './index.js';

describe('healthResponseSchema', () => {
  it('accepts the API health response shape', () => {
    expect(healthResponseSchema.parse({ status: 'ok', service: 'api' })).toEqual({
      status: 'ok',
      service: 'api',
    });
  });
});
