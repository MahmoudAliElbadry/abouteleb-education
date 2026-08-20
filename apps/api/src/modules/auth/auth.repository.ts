import {
  Prisma,
  type PrismaClient,
  type UserRole,
  type UserStatus,
  type VerificationPurpose,
} from '@prisma/client';

export type AuthUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt: Date | null;
  profile: { fullName: string } | null;
};

export type AuthChallenge = {
  id: string;
  codeHash: string;
  attemptCount: number;
  expiresAt: Date;
};

export type AuthSession = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  lastSeenAt: Date;
  user: AuthUser;
};

export type AuditEvent = {
  actorUserId?: string | undefined;
  action: string;
  entityType?: string | undefined;
  entityId?: string | undefined;
  metadata?: Prisma.InputJsonValue | undefined;
  ipAddress?: string | undefined;
};

export interface AuthRepository {
  createAccountWithChallenge(input: {
    email: string;
    passwordHash: string;
    fullName: string;
  }): Promise<AuthUser>;
  findUserByEmail(email: string): Promise<AuthUser | null>;
  findUserById(id: string): Promise<AuthUser | null>;
  createChallenge(input: {
    userId: string;
    purpose: VerificationPurpose;
    codeHash: string;
    expiresAt: Date;
  }): Promise<void>;
  findActiveChallenge(userId: string, purpose: VerificationPurpose): Promise<AuthChallenge | null>;
  incrementChallengeAttempt(id: string, maxAttempts: number): Promise<boolean>;
  consumeChallenge(id: string, maxAttempts: number): Promise<boolean>;
  markEmailVerified(userId: string, verifiedAt: Date): Promise<void>;
  updateLastLogin(userId: string, at: Date): Promise<void>;
  updatePasswordAndRevokeSessions(userId: string, passwordHash: string, at: Date): Promise<void>;
  createSession(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
  revokeSession(tokenHash: string, at: Date): Promise<void>;
  findActiveSession(tokenHash: string, now: Date): Promise<AuthSession | null>;
  touchSession(id: string, at: Date): Promise<void>;
  createAuditEvent(event: AuditEvent): Promise<void>;
}

const userWithProfile = { profile: true } satisfies Prisma.UserInclude;

function toAuthUser(user: Prisma.UserGetPayload<{ include: typeof userWithProfile }>): AuthUser {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role,
    status: user.status,
    emailVerifiedAt: user.emailVerifiedAt,
    profile: user.profile ? { fullName: user.profile.fullName } : null,
  };
}

export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createAccountWithChallenge(input: {
    email: string;
    passwordHash: string;
    fullName: string;
  }) {
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        profile: { create: { fullName: input.fullName } },
      },
      include: userWithProfile,
    });
    return toAuthUser(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, include: userWithProfile });
    return user ? toAuthUser(user) : null;
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, include: userWithProfile });
    return user ? toAuthUser(user) : null;
  }

  async createChallenge(input: {
    userId: string;
    purpose: VerificationPurpose;
    codeHash: string;
    expiresAt: Date;
  }) {
    await this.prisma.$transaction([
      this.prisma.verificationChallenge.updateMany({
        where: { userId: input.userId, purpose: input.purpose, consumedAt: null },
        data: { consumedAt: new Date() },
      }),
      this.prisma.verificationChallenge.create({ data: input }),
    ]);
  }

  async findActiveChallenge(userId: string, purpose: VerificationPurpose) {
    const challenge = await this.prisma.verificationChallenge.findFirst({
      where: { userId, purpose, consumedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
    return challenge
      ? {
          id: challenge.id,
          codeHash: challenge.codeHash,
          attemptCount: challenge.attemptCount,
          expiresAt: challenge.expiresAt,
        }
      : null;
  }

  async incrementChallengeAttempt(id: string, maxAttempts: number) {
    const result = await this.prisma.verificationChallenge.updateMany({
      where: {
        id,
        consumedAt: null,
        expiresAt: { gt: new Date() },
        attemptCount: { lt: maxAttempts },
      },
      data: { attemptCount: { increment: 1 } },
    });
    return result.count === 1;
  }

  async consumeChallenge(id: string, maxAttempts: number) {
    const result = await this.prisma.verificationChallenge.updateMany({
      where: {
        id,
        consumedAt: null,
        expiresAt: { gt: new Date() },
        attemptCount: { lt: maxAttempts },
      },
      data: { consumedAt: new Date() },
    });
    return result.count === 1;
  }

  async markEmailVerified(userId: string, verifiedAt: Date) {
    await this.prisma.user.update({ where: { id: userId }, data: { emailVerifiedAt: verifiedAt } });
  }

  async updateLastLogin(userId: string, at: Date) {
    await this.prisma.user.update({ where: { id: userId }, data: { lastLoginAt: at } });
  }

  async updatePasswordAndRevokeSessions(userId: string, passwordHash: string, at: Date) {
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userId }, data: { passwordHash } }),
      this.prisma.session.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: at },
      }),
    ]);
  }

  async createSession(userId: string, tokenHash: string, expiresAt: Date) {
    await this.prisma.session.create({ data: { userId, tokenHash, expiresAt } });
  }

  async revokeSession(tokenHash: string, at: Date) {
    await this.prisma.session.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: at },
    });
  }

  async findActiveSession(tokenHash: string, now: Date) {
    const session = await this.prisma.session.findFirst({
      where: { tokenHash, revokedAt: null, expiresAt: { gt: now } },
      include: { user: { include: userWithProfile } },
    });
    if (!session) return null;
    return {
      id: session.id,
      userId: session.userId,
      tokenHash: session.tokenHash,
      expiresAt: session.expiresAt,
      lastSeenAt: session.lastSeenAt,
      user: toAuthUser(session.user),
    };
  }

  async touchSession(id: string, at: Date) {
    await this.prisma.session.update({ where: { id }, data: { lastSeenAt: at } });
  }

  async createAuditEvent(event: AuditEvent) {
    await this.prisma.auditLog.create({
      data: {
        action: event.action,
        ...(event.actorUserId ? { actorUserId: event.actorUserId } : {}),
        ...(event.entityType ? { entityType: event.entityType } : {}),
        ...(event.entityId ? { entityId: event.entityId } : {}),
        ...(event.metadata === undefined ? {} : { metadata: event.metadata }),
        ...(event.ipAddress ? { ipAddress: event.ipAddress } : {}),
      },
    });
  }
}

export function isUniqueEmailError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}
