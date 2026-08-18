import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { appErrors } from '../core/app-error.js';
import { authModule } from '../modules/auth/auth.module.js';

export async function requireAuth(request: Request, response: Response, next: NextFunction) {
  const user = await authModule.sessions.getUser(request.cookies[env.SESSION_COOKIE_NAME]);
  if (!user) {
    next(appErrors.unauthenticated());
    return;
  }

  response.locals.user = user;
  next();
}

export function requireCsrf(request: Request, response: Response, next: NextFunction) {
  if (!authModule.sessions.hasValidCsrfToken(request)) {
    next(appErrors.invalidCsrf());
    return;
  }

  next();
}
