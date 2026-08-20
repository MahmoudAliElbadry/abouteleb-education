/**
 * Deployment-phase contracts. Implement these with shared Redis and a durable
 * database-backed outbox only after the hosting provider has been selected.
 */
export interface SharedRateLimitStore {
  increment(key: string, windowMs: number): Promise<{ count: number; resetAt: Date }>;
}

export interface EmailOutbox {
  enqueue(message: {
    recipient: string;
    template: 'EMAIL_VERIFY' | 'PASSWORD_RESET';
    payload: Record<string, string>;
  }): Promise<void>;
}
