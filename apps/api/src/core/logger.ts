type LogLevel = 'error' | 'info' | 'warn';

const sensitiveKeys = new Set(['authorization', 'code', 'cookie', 'otp', 'password', 'token']);

function redact(value: unknown, key?: string): unknown {
  if (key && sensitiveKeys.has(key.toLowerCase())) return '[REDACTED]';
  if (Array.isArray(value)) return value.map((item) => redact(item));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        redact(entryValue, entryKey),
      ]),
    );
  }
  return value;
}

function write(level: LogLevel, event: string, context: Record<string, unknown> = {}) {
  const safeContext = redact(context) as Record<string, unknown>;
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    ...safeContext,
  });

  if (level === 'error') {
    process.stderr.write(`${entry}\n`);
    return;
  }
  process.stdout.write(`${entry}\n`);
}

export const logger = {
  error: (event: string, context?: Record<string, unknown>) => write('error', event, context),
  info: (event: string, context?: Record<string, unknown>) => write('info', event, context),
  warn: (event: string, context?: Record<string, unknown>) => write('warn', event, context),
};
