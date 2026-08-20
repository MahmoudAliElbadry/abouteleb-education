import { VerificationPurpose } from '@prisma/client';
import { appErrors } from '../../core/app-error.js';
import { generateOtp, hashOtp } from '../../lib/otp.js';
import type { AuthRepository } from './auth.repository.js';
import type { EmailProvider } from './email.provider.js';

const OTP_TTL_MS = 10 * 60 * 1000;
export const MAX_OTP_ATTEMPTS = 5;

export class ChallengeService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly emailProvider: EmailProvider,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async issue(userId: string, email: string, purpose: VerificationPurpose) {
    const code = generateOtp();
    await this.repository.createChallenge({
      userId,
      purpose,
      codeHash: hashOtp(code),
      expiresAt: new Date(this.now().getTime() + OTP_TTL_MS),
    });
    await this.emailProvider.sendOtp({ recipient: email, code, purpose });
  }

  async verify(userId: string, code: string, purpose: VerificationPurpose) {
    const challenge = await this.repository.findActiveChallenge(userId, purpose);
    const invalid =
      !challenge ||
      challenge.attemptCount >= MAX_OTP_ATTEMPTS ||
      challenge.codeHash !== hashOtp(code);

    if (invalid) {
      if (challenge)
        await this.repository.incrementChallengeAttempt(challenge.id, MAX_OTP_ATTEMPTS);
      throw purpose === 'EMAIL_VERIFY' ? appErrors.invalidVerification() : appErrors.invalidReset();
    }

    const consumed = await this.repository.consumeChallenge(challenge.id, MAX_OTP_ATTEMPTS);
    if (!consumed) {
      throw purpose === 'EMAIL_VERIFY' ? appErrors.invalidVerification() : appErrors.invalidReset();
    }
  }
}
