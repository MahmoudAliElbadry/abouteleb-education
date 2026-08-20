import * as Sentry from '@sentry/node';
import { env } from '../config/env.js';

export function initializeMonitoring() {
  if (!env.SENTRY_DSN) return;
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    sendDefaultPii: false,
    beforeSend(event) {
      delete event.user;
      delete event.request?.cookies;
      delete event.request?.headers?.authorization;
      return event;
    },
  });
}

export function captureException(error: unknown, requestId?: string) {
  if (!env.SENTRY_DSN) return;
  Sentry.withScope((scope) => {
    if (requestId) scope.setTag('requestId', requestId);
    Sentry.captureException(error);
  });
}
