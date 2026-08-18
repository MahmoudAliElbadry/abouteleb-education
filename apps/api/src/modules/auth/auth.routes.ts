import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.schemas.js';
import * as authService from './auth.service.js';
import { createSession, revokeSession } from '../../lib/session.js';
import { env } from '../../config/env.js';
import { requireAuth, requireCsrf } from '../../middleware/auth.js';

export const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

authRouter.use(authLimiter);

authRouter.post('/register', async (request, response, next) => {
  try {
    const input = registerSchema.parse(request.body);
    const user = await authService.register(input);
    response
      .status(201)
      .json({ user, message: 'Account created. Check your email for the verification code.' });
  } catch (error) {
    if (error instanceof Error && error.message === 'ACCOUNT_EXISTS') {
      response
        .status(409)
        .json({ error: { code: 'ACCOUNT_EXISTS', message: 'Account already exists' } });
      return;
    }
    next(error);
  }
});

authRouter.post('/verify-email', async (request, response, next) => {
  try {
    const input = verifyEmailSchema.parse(request.body);
    const user = await authService.verifyEmail(input.email, input.code);
    response.json({ user, message: 'Email verified successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_VERIFICATION') {
      response.status(400).json({
        error: { code: 'INVALID_VERIFICATION', message: 'Invalid or expired verification code' },
      });
      return;
    }
    next(error);
  }
});

authRouter.post('/resend-verification', async (request, response, next) => {
  try {
    const input = forgotPasswordSchema.parse(request.body);
    await authService.resendVerification(input.email);
    response.json({ message: 'If the account exists and is unverified, a new code was sent.' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (request, response, next) => {
  try {
    const input = loginSchema.parse(request.body);
    const user = await authService.login(input.email, input.password);
    await createSession(user.id, response);
    response.json({ user });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_NOT_VERIFIED') {
      response.status(403).json({
        error: { code: 'EMAIL_NOT_VERIFIED', message: 'Verify your email before signing in' },
      });
      return;
    }
    if (error instanceof Error && error.message === 'INVALID_LOGIN') {
      response
        .status(401)
        .json({ error: { code: 'INVALID_LOGIN', message: 'Invalid email or password' } });
      return;
    }
    next(error);
  }
});

authRouter.post('/logout', requireAuth, requireCsrf, async (request, response, next) => {
  try {
    await revokeSession(request.cookies[env.SESSION_COOKIE_NAME], response);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

authRouter.get('/session', requireAuth, (_request, response) => {
  const user = response.locals.user;
  response.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: Boolean(user.emailVerifiedAt),
      fullName: user.profile?.fullName ?? null,
    },
  });
});

authRouter.post('/forgot-password', async (request, response, next) => {
  try {
    const input = forgotPasswordSchema.parse(request.body);
    await authService.requestPasswordReset(input.email);
    response.json({ message: 'If the account exists, password reset instructions were sent.' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/reset-password', async (request, response, next) => {
  try {
    const input = resetPasswordSchema.parse(request.body);
    await authService.resetPassword(input.email, input.code, input.newPassword);
    response.json({ message: 'Password reset successfully. Please sign in again.' });
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_RESET') {
      response
        .status(400)
        .json({ error: { code: 'INVALID_RESET', message: 'Invalid or expired reset code' } });
      return;
    }
    next(error);
  }
});
