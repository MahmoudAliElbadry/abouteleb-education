import { describe, expect, it, vi } from 'vitest';
import { AccountService } from './account.service.js';
import type { AuditService } from './audit.service.js';
import type { AuthRepository } from './auth.repository.js';
import type { ChallengeService } from './challenge.service.js';

describe('AccountService', () => {
  it('propagates repository failures without converting them into an authentication response', async () => {
    const repository = {
      findUserByEmail: vi.fn().mockRejectedValue(new Error('database unavailable')),
    } as unknown as AuthRepository;
    const service = new AccountService(repository, {} as ChallengeService, {} as AuditService);

    await expect(service.requestPasswordReset('client@example.com')).rejects.toThrow(
      'database unavailable',
    );
  });
});
