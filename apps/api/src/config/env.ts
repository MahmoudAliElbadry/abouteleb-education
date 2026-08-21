import 'dotenv/config';
import { z } from 'zod';

const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  WEB_ORIGIN: z.string().url().default('http://localhost:5173'),
  COOKIE_DOMAIN: z.string().min(1).optional(),
  DATABASE_URL: z.string().url().optional(),
  BOOTSTRAP_ADMIN_EMAIL: z.string().email().default('mostafa.ahmed.abuhamed@gmail.com'),
  RESEND_API_KEY: z.string().min(1).optional(),
  AUTH_EMAIL_PROVIDER: z.enum(['development', 'resend']).optional(),
  EMAIL_FROM: z.string().email().default('no-reply@aboutalebeducation.com'),
  SESSION_TTL_DAYS: z.coerce.number().int().min(1).max(30).default(7),
  SESSION_COOKIE_NAME: z.string().min(1).default('abou_session'),
  CSRF_COOKIE_NAME: z.string().min(1).default('abou_csrf'),
  SENTRY_DSN: z.string().url().optional(),
});

function parseEnv() {
  const parsed = baseEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    API_PORT: process.env.PORT ?? process.env.API_PORT,
    WEB_ORIGIN: process.env.WEB_ORIGIN,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined,
    DATABASE_URL: process.env.DATABASE_URL,
    BOOTSTRAP_ADMIN_EMAIL: process.env.BOOTSTRAP_ADMIN_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    AUTH_EMAIL_PROVIDER: process.env.AUTH_EMAIL_PROVIDER || undefined,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SESSION_TTL_DAYS: process.env.SESSION_TTL_DAYS,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
    CSRF_COOKIE_NAME: process.env.CSRF_COOKIE_NAME,
    SENTRY_DSN: process.env.SENTRY_DSN || undefined,
  });

  const emailProvider =
    parsed.AUTH_EMAIL_PROVIDER ?? (parsed.NODE_ENV === 'production' ? 'resend' : 'development');

  if (parsed.NODE_ENV === 'production') {
    if (!parsed.DATABASE_URL) {
      throw new Error('DATABASE_URL is required in production');
    }
    if (emailProvider !== 'resend' || !parsed.RESEND_API_KEY) {
      throw new Error('A configured Resend email provider is required in production');
    }
    if (!parsed.WEB_ORIGIN.startsWith('https://')) {
      throw new Error('WEB_ORIGIN must use HTTPS in production');
    }
    if (!parsed.COOKIE_DOMAIN) {
      throw new Error('COOKIE_DOMAIN is required in production');
    }
  }

  return { ...parsed, AUTH_EMAIL_PROVIDER: emailProvider };
}

export const env = parseEnv();
