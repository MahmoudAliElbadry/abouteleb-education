import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { getSessionUser } from '../lib/session.js';
import { hasValidCsrfToken } from '../lib/session.js';

export async function requireAuth(request: Request, response: Response, next: NextFunction) {
  const user = await getSessionUser(request.cookies[env.SESSION_COOKIE_NAME]);
  if (!user) {
    response.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Sign in required' } });
    return;
  }

  response.locals.user = user;
  next();
}

export function requireCsrf(request: Request, response: Response, next: NextFunction) {
  if (!hasValidCsrfToken(request)) {
    response.status(403).json({ error: { code: 'INVALID_CSRF', message: 'Invalid CSRF token' } });
    return;
  }

  next();
}
