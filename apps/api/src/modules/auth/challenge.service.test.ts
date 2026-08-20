import { describe, expect, it, vi } from 'vitest';
import { AppError } from '../../core/app-error.js';
import { hashOtp } from '../../lib/otp.js';
import { ChallengeService, MAX_OTP_ATTEMPTS } from './challenge.service.js';
import type { AuthRepository } from './auth.repository.js';
import type { EmailProvider } from './email.provider.js';

function repositoryStub(): AuthRepository {
  return {
    createAccountWithChallenge: vi.fn(),
    findUserByEmail: vi.fn(),
    findUserById: vi.fn(),
    createChallenge: vi.fn(),
    findActiveChallenge: vi.fn(),
    incrementChallengeAttempt: vi.fn(),
    consumeChallenge: vi.fn(),
    markEmailVerified: vi.fn(),
    updateLastLogin: vi.fn(),
    updatePasswordAndRevokeSessions: vi.fn(),
    createSession: vi.fn(),
    revokeSession: vi.fn(),
    findActiveSession: vi.fn(),
    touchSession: vi.fn(),
    createAuditEvent: vi.fn(),
  };
}

describe('ChallengeService', () => {
  it('counts a failed password-reset attempt using the same policy as verification', async () => {
    const repository = repositoryStub();
    vi.mocked(repository.findActiveChallenge).mockResolvedValue({
      id: 'challenge-1',
      codeHash: hashOtp('123456'),
      attemptCount: 0,
      expiresAt: new Date(Date.now() + 60_000),
    });
    const service = new ChallengeService(repository, {
      sendOtp: vi.fn(),
      sendOrderNotification: vi.fn(),
    } satisfies EmailProvider);

    await expect(service.verify('user-1', '654321', 'PASSWORD_RESET')).rejects.toMatchObject({
      code: 'INVALID_RESET',
    } satisfies Partial<AppError>);
    expect(repository.incrementChallengeAttempt).toHaveBeenCalledWith(
      'challenge-1',
      MAX_OTP_ATTEMPTS,
    );
  });

  it('rejects exhausted OTP challenges without consuming them', async () => {
    const repository = repositoryStub();
    vi.mocked(repository.findActiveChallenge).mockResolvedValue({
      id: 'challenge-1',
      codeHash: hashOtp('123456'),
      attemptCount: MAX_OTP_ATTEMPTS,
      expiresAt: new Date(Date.now() + 60_000),
    });
    const service = new ChallengeService(repository, {
      sendOtp: vi.fn(),
      sendOrderNotification: vi.fn(),
    } satisfies EmailProvider);

    await expect(service.verify('user-1', '123456', 'EMAIL_VERIFY')).rejects.toMatchObject({
      code: 'INVALID_VERIFICATION',
    });
    expect(repository.consumeChallenge).not.toHaveBeenCalled();
  });

  it('treats a missing active challenge, including an expired one filtered by the repository, as invalid', async () => {
    const repository = repositoryStub();
    vi.mocked(repository.findActiveChallenge).mockResolvedValue(null);
    const service = new ChallengeService(repository, {
      sendOtp: vi.fn(),
      sendOrderNotification: vi.fn(),
    } satisfies EmailProvider);

    await expect(service.verify('user-1', '123456', 'PASSWORD_RESET')).rejects.toMatchObject({
      code: 'INVALID_RESET',
    });
  });
});
