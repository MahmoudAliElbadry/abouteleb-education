import * as Sentry from '@sentry/react';

export function initializeMonitoring() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    sendDefaultPii: false,
    beforeSend(event) {
      delete event.user;
      delete event.request?.cookies;
      return event;
    },
  });
}
