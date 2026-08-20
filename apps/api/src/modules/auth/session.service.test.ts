import { describe, expect, it, vi } from 'vitest';
import { SessionService } from './session.service.js';
import type { AuthRepository, AuthUser } from './auth.repository.js';

const user: AuthUser = {
  id: 'user-1',
  email: 'client@example.com',
  passwordHash: 'not-exposed',
  role: 'CLIENT',
  status: 'ACTIVE',
  emailVerifiedAt: new Date('2026-08-18T00:00:00.000Z'),
  profile: { fullName: 'Client Name' },
};

describe('SessionService', () => {
  it('throttles last-seen updates while returning an active user', async () => {
    const now = new Date('2026-08-18T12:00:00.000Z');
    const repository = {
      findActiveSession: vi.fn().mockResolvedValue({
        id: 'session-1',
        userId: user.id,
        tokenHash: 'hash',
        expiresAt: new Date('2026-08-19T12:00:00.000Z'),
        lastSeenAt: new Date('2026-08-18T11:40:00.000Z'),
        user,
      }),
      touchSession: vi.fn(),
    } as unknown as AuthRepository;
    const service = new SessionService(repository, () => now);

    await expect(service.getUser('raw-token')).resolves.toEqual(user);
    expect(repository.touchSession).toHaveBeenCalledWith('session-1', now);
  });
});
