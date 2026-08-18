import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import { prisma } from './prisma.js';
import { env } from '../config/env.js';

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId: string, response: Response) {
  const rawToken = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: { userId, tokenHash: hashToken(rawToken), expiresAt },
  });

  response.cookie(env.SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  response.cookie(env.CSRF_COOKIE_NAME, randomBytes(32).toString('base64url'), {
    httpOnly: false,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function revokeSession(rawToken: string | undefined, response: Response) {
  if (rawToken) {
    await prisma.session.updateMany({
      where: { tokenHash: hashToken(rawToken), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  response.clearCookie(env.SESSION_COOKIE_NAME, { httpOnly: true, path: '/' });
  response.clearCookie(env.CSRF_COOKIE_NAME, { httpOnly: false, path: '/' });
}

export function hasValidCsrfToken(request: Request) {
  const cookieToken = request.cookies[env.CSRF_COOKIE_NAME];
  const headerToken = request.header('x-csrf-token');
  if (!cookieToken || !headerToken || cookieToken.length !== headerToken.length) return false;

  return timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken));
}

export async function getSessionUser(rawToken: string | undefined) {
  if (!rawToken) return null;

  const session = await prisma.session.findFirst({
    where: {
      tokenHash: hashToken(rawToken),
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { user: { include: { profile: true } } },
  });

  if (!session || session.user.status !== 'ACTIVE') return null;
  return session.user;
}
