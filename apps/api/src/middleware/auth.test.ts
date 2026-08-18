import { describe, expect, it, vi } from 'vitest';
import { appErrors } from '../core/app-error.js';
import { requireAdmin } from './auth.js';

describe('requireAdmin', () => {
  it('allows an authenticated administrator', () => {
    const next = vi.fn();
    const response = { locals: { user: { role: 'ADMIN' } } } as never;

    requireAdmin({} as never, response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('rejects clients and missing users with a typed forbidden error', () => {
    const next = vi.fn();
    const response = { locals: { user: { role: 'CLIENT' } } } as never;

    requireAdmin({} as never, response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining(appErrors.forbidden()));
    expect(next.mock.calls[0]?.[0]?.code).toBe('FORBIDDEN');
  });
});
