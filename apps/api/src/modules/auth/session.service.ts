import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import { env } from '../../config/env.js';
import type { AuthRepository, AuthUser } from './auth.repository.js';

const SESSION_TOUCH_INTERVAL_MS = 15 * 60 * 1000;

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export class SessionService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async create(userId: string, response: Response) {
    const rawToken = randomBytes(32).toString('base64url');
    const expiresAt = new Date(this.now().getTime() + env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
    await this.repository.createSession(userId, hashToken(rawToken), expiresAt);
    this.setCookies(rawToken, expiresAt, response);
  }

  async revoke(rawToken: string | undefined, response: Response) {
    if (rawToken) await this.repository.revokeSession(hashToken(rawToken), this.now());
    const cookieScope = env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {};
    response.clearCookie(env.SESSION_COOKIE_NAME, {
      httpOnly: true,
      path: '/',
      ...cookieScope,
    });
    response.clearCookie(env.CSRF_COOKIE_NAME, {
      httpOnly: false,
      path: '/',
      ...cookieScope,
    });
  }

  async getUser(rawToken: string | undefined): Promise<AuthUser | null> {
    if (!rawToken) return null;
    const now = this.now();
    const session = await this.repository.findActiveSession(hashToken(rawToken), now);
    if (!session || session.user.status !== 'ACTIVE') return null;
    if (now.getTime() - session.lastSeenAt.getTime() >= SESSION_TOUCH_INTERVAL_MS) {
      await this.repository.touchSession(session.id, now);
    }
    return session.user;
  }

  hasValidCsrfToken(request: Request) {
    const cookieToken = request.cookies[env.CSRF_COOKIE_NAME];
    const headerToken = request.header('x-csrf-token');
    if (!cookieToken || !headerToken || cookieToken.length !== headerToken.length) return false;
    return timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken));
  }

  private setCookies(rawToken: string, expiresAt: Date, response: Response) {
    const cookieOptions = {
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      expires: expiresAt,
      ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
    };
    response.cookie(env.SESSION_COOKIE_NAME, rawToken, { ...cookieOptions, httpOnly: true });
    response.cookie(env.CSRF_COOKIE_NAME, randomBytes(32).toString('base64url'), {
      ...cookieOptions,
      httpOnly: false,
    });
  }
}
