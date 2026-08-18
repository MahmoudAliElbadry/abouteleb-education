import { describe, expect, it } from 'vitest';
import { presentPublicUser } from './auth.presenter.js';

describe('presentPublicUser', () => {
  it('does not expose password hashes or internal status', () => {
    expect(
      presentPublicUser({
        id: 'user-1',
        email: 'client@example.com',
        passwordHash: 'secret-hash',
        role: 'CLIENT',
        status: 'ACTIVE',
        emailVerifiedAt: new Date(),
        profile: { fullName: 'Client Name' },
      }),
    ).toEqual({
      id: 'user-1',
      email: 'client@example.com',
      role: 'CLIENT',
      emailVerified: true,
      fullName: 'Client Name',
    });
  });
});
