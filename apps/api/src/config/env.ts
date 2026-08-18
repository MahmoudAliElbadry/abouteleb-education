import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  WEB_ORIGIN: z.string().url().default('http://localhost:5173'),
  DATABASE_URL: z.string().url().optional(),
  BOOTSTRAP_ADMIN_EMAIL: z.string().email().default('mostafa.ahmed.abuhamed@gmail.com'),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().email().default('no-reply@aboutalebeducation.com'),
  SESSION_TTL_DAYS: z.coerce.number().int().min(1).max(30).default(7),
  SESSION_COOKIE_NAME: z.string().min(1).default('abou_session'),
  CSRF_COOKIE_NAME: z.string().min(1).default('abou_csrf'),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_PORT: process.env.API_PORT,
  WEB_ORIGIN: process.env.WEB_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL,
  BOOTSTRAP_ADMIN_EMAIL: process.env.BOOTSTRAP_ADMIN_EMAIL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  SESSION_TTL_DAYS: process.env.SESSION_TTL_DAYS,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  CSRF_COOKIE_NAME: process.env.CSRF_COOKIE_NAME,
});
