import { VerificationPurpose } from '@prisma/client';
import { appErrors } from '../../core/app-error.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import type { RegisterInput } from './auth.schemas.js';
import type { AuditService } from './audit.service.js';
import type { AuthRepository } from './auth.repository.js';
import { isUniqueEmailError } from './auth.repository.js';
import type { ChallengeService } from './challenge.service.js';
import { presentPublicUser } from './auth.presenter.js';

export class AccountService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly challenges: ChallengeService,
    private readonly audit: AuditService,
  ) {}

  async register(input: RegisterInput, ipAddress?: string) {
    const passwordHash = await hashPassword(input.password);
    try {
      const user = await this.repository.createAccountWithChallenge({
        email: input.email,
        passwordHash,
        fullName: input.fullName,
      });
      await this.challenges.issue(user.id, user.email, VerificationPurpose.EMAIL_VERIFY);
      await this.audit.record({
        actorUserId: user.id,
        action: 'auth.registration.completed',
        entityType: 'User',
        entityId: user.id,
        ipAddress,
      });
      return presentPublicUser(user);
    } catch (error) {
      if (isUniqueEmailError(error)) throw appErrors.accountExists();
      throw error;
    }
  }

  async verifyEmail(email: string, code: string, ipAddress?: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) throw appErrors.invalidVerification();
    await this.challenges.verify(user.id, code, VerificationPurpose.EMAIL_VERIFY);
    const verifiedAt = new Date();
    await this.repository.markEmailVerified(user.id, verifiedAt);
    await this.audit.record({
      actorUserId: user.id,
      action: 'auth.email.verified',
      entityType: 'User',
      entityId: user.id,
      ipAddress,
    });
    return presentPublicUser({ ...user, emailVerifiedAt: verifiedAt });
  }

  async resendVerification(email: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user || user.emailVerifiedAt) return;
    await this.challenges.issue(user.id, user.email, VerificationPurpose.EMAIL_VERIFY);
  }

  async login(email: string, password: string, ipAddress?: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user || !(await verifyPassword(user.passwordHash, password)) || user.status !== 'ACTIVE') {
      throw appErrors.invalidLogin();
    }
    if (!user.emailVerifiedAt) throw appErrors.emailNotVerified();
    await this.repository.updateLastLogin(user.id, new Date());
    await this.audit.record({
      actorUserId: user.id,
      action: 'auth.login.succeeded',
      entityType: 'Session',
      ipAddress,
    });
    return presentPublicUser(user);
  }

  async requestPasswordReset(email: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user || user.status !== 'ACTIVE') return;
    await this.challenges.issue(user.id, user.email, VerificationPurpose.PASSWORD_RESET);
  }

  async resetPassword(email: string, code: string, newPassword: string, ipAddress?: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) throw appErrors.invalidReset();
    await this.challenges.verify(user.id, code, VerificationPurpose.PASSWORD_RESET);
    await this.repository.updatePasswordAndRevokeSessions(
      user.id,
      await hashPassword(newPassword),
      new Date(),
    );
    await this.audit.record({
      actorUserId: user.id,
      action: 'auth.password.reset',
      entityType: 'User',
      entityId: user.id,
      ipAddress,
    });
  }
}
