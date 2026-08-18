import { VerificationPurpose } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { generateOtp, hashOtp } from '../../lib/otp.js';
import { sendVerificationEmail } from '../../lib/email.js';
import type { RegisterInput } from './auth.schemas.js';

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

function publicUser(user: {
  id: string;
  email: string;
  role: string;
  emailVerifiedAt: Date | null;
  profile: { fullName: string } | null;
}) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    emailVerified: Boolean(user.emailVerifiedAt),
    fullName: user.profile?.fullName ?? null,
  };
}

async function createChallenge(userId: string, purpose: VerificationPurpose) {
  const code = generateOtp();
  await prisma.verificationChallenge.updateMany({
    where: { userId, purpose, consumedAt: null },
    data: { consumedAt: new Date() },
  });

  const challenge = await prisma.verificationChallenge.create({
    data: {
      userId,
      purpose,
      codeHash: hashOtp(code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
  });

  return { challenge, code };
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new Error('ACCOUNT_EXISTS');
  }

  const passwordHash = await hashPassword(input.password);
  const code = generateOtp();
  const { user } = await prisma.$transaction(async (transaction) => {
    const user = await transaction.user.create({
      data: {
        email: input.email,
        passwordHash,
        profile: { create: { fullName: input.fullName } },
      },
      include: { profile: true },
    });

    await transaction.verificationChallenge.create({
      data: {
        userId: user.id,
        purpose: VerificationPurpose.EMAIL_VERIFY,
        codeHash: hashOtp(code),
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    });

    return { user };
  });

  await sendVerificationEmail({
    recipient: user.email,
    code,
    purpose: 'EMAIL_VERIFY',
  });

  return publicUser(user);
}

export async function verifyEmail(email: string, code: string) {
  const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
  if (!user) throw new Error('INVALID_VERIFICATION');

  const challenge = await prisma.verificationChallenge.findFirst({
    where: {
      userId: user.id,
      purpose: VerificationPurpose.EMAIL_VERIFY,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (
    !challenge ||
    challenge.attemptCount >= MAX_OTP_ATTEMPTS ||
    challenge.codeHash !== hashOtp(code)
  ) {
    if (challenge) {
      await prisma.verificationChallenge.update({
        where: { id: challenge.id },
        data: { attemptCount: { increment: 1 } },
      });
    }
    throw new Error('INVALID_VERIFICATION');
  }

  const verifiedAt = new Date();
  await prisma.$transaction([
    prisma.verificationChallenge.update({
      where: { id: challenge.id },
      data: { consumedAt: verifiedAt },
    }),
    prisma.user.update({ where: { id: user.id }, data: { emailVerifiedAt: verifiedAt } }),
  ]);

  return publicUser({ ...user, emailVerifiedAt: verifiedAt });
}

export async function resendVerification(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.emailVerifiedAt) return;

  const { code } = await createChallenge(user.id, VerificationPurpose.EMAIL_VERIFY);
  await sendVerificationEmail({ recipient: user.email, code, purpose: 'EMAIL_VERIFY' });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
  if (!user || !(await verifyPassword(user.passwordHash, password)))
    throw new Error('INVALID_LOGIN');
  if (!user.emailVerifiedAt) throw new Error('EMAIL_NOT_VERIFIED');

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  return publicUser(user);
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const { code } = await createChallenge(user.id, VerificationPurpose.PASSWORD_RESET);
  await sendVerificationEmail({ recipient: user.email, code, purpose: 'PASSWORD_RESET' });
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('INVALID_RESET');

  const challenge = await prisma.verificationChallenge.findFirst({
    where: {
      userId: user.id,
      purpose: VerificationPurpose.PASSWORD_RESET,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (
    !challenge ||
    challenge.attemptCount >= MAX_OTP_ATTEMPTS ||
    challenge.codeHash !== hashOtp(code)
  ) {
    throw new Error('INVALID_RESET');
  }

  await prisma.$transaction([
    prisma.verificationChallenge.update({
      where: { id: challenge.id },
      data: { consumedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(newPassword) },
    }),
    prisma.session.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);
}
