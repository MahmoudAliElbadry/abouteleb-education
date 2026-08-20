import { describe, expect, it } from 'vitest';
import { AppError, appErrors } from './app-error.js';

describe('AppError', () => {
  it('keeps a stable code, status, public message, and metadata', () => {
    const error = new AppError('INVALID_LOGIN', 401, 'Invalid email or password', {
      source: 'test',
    });

    expect(error).toMatchObject({
      code: 'INVALID_LOGIN',
      status: 401,
      publicMessage: 'Invalid email or password',
      metadata: { source: 'test' },
    });
  });

  it('provides safe application errors', () => {
    expect(appErrors.accountExists()).toBeInstanceOf(AppError);
    expect(appErrors.invalidReset().status).toBe(400);
  });
});
