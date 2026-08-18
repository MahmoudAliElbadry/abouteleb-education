import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.schemas.js';
import { authModule } from './auth.module.js';
import { env } from '../../config/env.js';
import { requireAuth, requireCsrf } from '../../middleware/auth.js';
import { presentPublicUser } from './auth.presenter.js';
import { appErrors } from '../../core/app-error.js';

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
    const user = await authModule.account.register(input, request.ip);
    response
      .status(201)
      .json({ user, message: 'Account created. Check your email for the verification code.' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/verify-email', async (request, response, next) => {
  try {
    const input = verifyEmailSchema.parse(request.body);
    const user = await authModule.account.verifyEmail(input.email, input.code, request.ip);
    response.json({ user, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/resend-verification', async (request, response, next) => {
  try {
    const input = forgotPasswordSchema.parse(request.body);
    await authModule.account.resendVerification(input.email);
    response.json({ message: 'If the account exists and is unverified, a new code was sent.' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (request, response, next) => {
  try {
    const input = loginSchema.parse(request.body);
    const user = await authModule.account.login(input.email, input.password, request.ip);
    await authModule.sessions.create(user.id, response);
    response.json({ user });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', requireAuth, requireCsrf, async (request, response, next) => {
  try {
    await authModule.sessions.revoke(request.cookies[env.SESSION_COOKIE_NAME], response);
    await authModule.audit.record({
      actorUserId: response.locals.user?.id,
      action: 'auth.logout.completed',
      entityType: 'Session',
      ipAddress: request.ip,
    });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

authRouter.get('/session', requireAuth, (_request, response) => {
  const user = response.locals.user;
  if (!user) throw appErrors.unauthenticated();
  response.json({
    user: presentPublicUser(user),
  });
});

authRouter.post('/forgot-password', async (request, response, next) => {
  try {
    const input = forgotPasswordSchema.parse(request.body);
    await authModule.account.requestPasswordReset(input.email);
    response.json({ message: 'If the account exists, password reset instructions were sent.' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/reset-password', async (request, response, next) => {
  try {
    const input = resetPasswordSchema.parse(request.body);
    await authModule.account.resetPassword(input.email, input.code, input.newPassword, request.ip);
    response.json({ message: 'Password reset successfully. Please sign in again.' });
  } catch (error) {
    next(error);
  }
});
