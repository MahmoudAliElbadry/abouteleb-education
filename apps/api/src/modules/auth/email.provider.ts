import { env } from '../../config/env.js';
import { AppError } from '../../core/app-error.js';
import { logger } from '../../core/logger.js';

export type EmailPurpose = 'EMAIL_VERIFY' | 'PASSWORD_RESET';

export interface EmailProvider {
  sendOtp(input: { recipient: string; code: string; purpose: EmailPurpose }): Promise<void>;
}

type DevelopmentMessage = { recipient: string; code: string; purpose: EmailPurpose };
const developmentMailbox: DevelopmentMessage[] = [];

export function getDevelopmentMailbox() {
  return [...developmentMailbox];
}

export function clearDevelopmentMailbox() {
  developmentMailbox.length = 0;
}

export class DevelopmentEmailProvider implements EmailProvider {
  async sendOtp(input: { recipient: string; code: string; purpose: EmailPurpose }) {
    developmentMailbox.push(input);
    logger.info('email.development.sent', {
      recipient: input.recipient,
      purpose: input.purpose,
      code: input.code,
    });
  }
}

export class ResendEmailProvider implements EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async sendOtp(input: { recipient: string; code: string; purpose: EmailPurpose }) {
    const subject = input.purpose === 'EMAIL_VERIFY' ? 'Verify your email' : 'Reset your password';
    try {
      const response = await this.fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: this.from,
          to: [input.recipient],
          subject,
          text: `Your Abou-Taleb Education code is ${input.code}. It expires in 10 minutes.`,
        }),
      });
      if (!response.ok) {
        throw new AppError(
          'EMAIL_DELIVERY_FAILED',
          503,
          'Unable to send email. Please try again shortly.',
          { providerStatus: response.status },
        );
      }
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        'EMAIL_DELIVERY_FAILED',
        503,
        'Unable to send email. Please try again shortly.',
      );
    }
  }
}

export function createEmailProvider(): EmailProvider {
  if (env.AUTH_EMAIL_PROVIDER === 'development') return new DevelopmentEmailProvider();
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required when AUTH_EMAIL_PROVIDER=resend');
  }
  return new ResendEmailProvider(env.RESEND_API_KEY, env.EMAIL_FROM);
}
