import 'dotenv/config';
import { z } from 'zod';

const originSchema = z.string().url();

export function parseWebOrigins(value: string) {
  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error('At least one web origin is required');
  }

  return origins.map((origin) => originSchema.parse(origin));
}

const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  WEB_ORIGIN: z.string().url().default('http://localhost:5173'),
  WEB_ORIGINS: z.string().optional(),
  COOKIE_DOMAIN: z.string().min(1).optional(),
  DATABASE_URL: z.string().url().optional(),
  BOOTSTRAP_ADMIN_EMAIL: z.string().email().default('mostafa.ahmed.abuhamed@gmail.com'),
  RESEND_API_KEY: z.string().min(1).optional(),
  AUTH_EMAIL_PROVIDER: z.enum(['development', 'resend']).optional(),
  EMAIL_FROM: z.string().email().default('no-reply@aboutalebeducation.com'),
  EMAIL_FROM_NAME: z.string().min(1).default('Abou-Taleb Education'),
  EMAIL_LOGO_URL: z.string().url().default('https://aboutalebeducation.com/images/email-logo.png'),
  EMAIL_BRAND_URL: z.string().url().default('https://aboutalebeducation.com'),
  SESSION_TTL_DAYS: z.coerce.number().int().min(1).max(30).default(7),
  SESSION_COOKIE_NAME: z.string().min(1).default('abou_session'),
  CSRF_COOKIE_NAME: z.string().min(1).default('abou_csrf'),
  SENTRY_DSN: z.string().url().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
});

function parseEnv() {
  const parsed = baseEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    API_PORT: process.env.PORT ?? process.env.API_PORT,
    WEB_ORIGIN: process.env.WEB_ORIGIN,
    WEB_ORIGINS: process.env.WEB_ORIGINS || undefined,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined,
    DATABASE_URL: process.env.DATABASE_URL,
    BOOTSTRAP_ADMIN_EMAIL: process.env.BOOTSTRAP_ADMIN_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    AUTH_EMAIL_PROVIDER: process.env.AUTH_EMAIL_PROVIDER || undefined,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    EMAIL_LOGO_URL: process.env.EMAIL_LOGO_URL,
    EMAIL_BRAND_URL: process.env.EMAIL_BRAND_URL,
    SESSION_TTL_DAYS: process.env.SESSION_TTL_DAYS,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
    CSRF_COOKIE_NAME: process.env.CSRF_COOKIE_NAME,
    SENTRY_DSN: process.env.SENTRY_DSN || undefined,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || undefined,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || undefined,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || undefined,
  });

  const emailProvider =
    parsed.AUTH_EMAIL_PROVIDER ?? (parsed.NODE_ENV === 'production' ? 'resend' : 'development');
  const webOrigins = parseWebOrigins(parsed.WEB_ORIGINS ?? parsed.WEB_ORIGIN);

  if (parsed.NODE_ENV === 'production') {
    if (!parsed.DATABASE_URL) {
      throw new Error('DATABASE_URL is required in production');
    }
    if (emailProvider !== 'resend' || !parsed.RESEND_API_KEY) {
      throw new Error('A configured Resend email provider is required in production');
    }
    if (webOrigins.some((origin) => !origin.startsWith('https://'))) {
      throw new Error('WEB_ORIGINS must use HTTPS in production');
    }
    if (!parsed.COOKIE_DOMAIN) {
      throw new Error('COOKIE_DOMAIN is required in production');
    }
    if (
      !parsed.CLOUDINARY_CLOUD_NAME ||
      !parsed.CLOUDINARY_API_KEY ||
      !parsed.CLOUDINARY_API_SECRET
    ) {
      throw new Error('Cloudinary credentials are required in production');
    }
  }

  return { ...parsed, AUTH_EMAIL_PROVIDER: emailProvider, WEB_ORIGINS: webOrigins };
}

export const env = parseEnv();
