import { env } from '../../config/env.js';
import { AppError } from '../../core/app-error.js';
import { logger } from '../../core/logger.js';

export type EmailPurpose = 'EMAIL_VERIFY' | 'PASSWORD_RESET';
export type EmailLocale = 'ar' | 'en' | 'tr';
export type OrderNotificationEvent = 'submitted' | 'status_changed';

export interface EmailProvider {
  sendOtp(input: {
    recipient: string;
    code: string;
    purpose: EmailPurpose;
    locale?: EmailLocale;
  }): Promise<void>;
  sendOrderNotification(input: {
    recipient: string;
    reference: string;
    event: OrderNotificationEvent;
    newStatus?: string;
  }): Promise<void>;
}

type DevelopmentMessage = {
  recipient: string;
  code: string;
  purpose: EmailPurpose;
  locale?: EmailLocale;
};
type DevelopmentOrderMessage = {
  recipient: string;
  reference: string;
  event: OrderNotificationEvent;
  newStatus?: string;
};
type ResendEmail = {
  recipient: string;
  subject: string;
  text: string;
};
const developmentMailbox: DevelopmentMessage[] = [];
const developmentOrderMailbox: DevelopmentOrderMessage[] = [];

export function getDevelopmentMailbox() {
  return [...developmentMailbox];
}

export function clearDevelopmentMailbox() {
  developmentMailbox.length = 0;
  developmentOrderMailbox.length = 0;
}

export function getDevelopmentOrderMailbox() {
  return [...developmentOrderMailbox];
}

export class DevelopmentEmailProvider implements EmailProvider {
  async sendOtp(input: DevelopmentMessage) {
    developmentMailbox.push(input);
    logger.info('email.development.sent', {
      recipient: input.recipient,
      purpose: input.purpose,
    });
  }

  async sendOrderNotification(input: DevelopmentOrderMessage) {
    developmentOrderMailbox.push(input);
    logger.info('email.development.order_sent', {
      recipient: input.recipient,
      reference: input.reference,
      event: input.event,
      newStatus: input.newStatus,
    });
  }
}

export class ResendEmailProvider implements EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async sendOtp(input: DevelopmentMessage) {
    const locale = input.locale ?? 'en';
    const subject = {
      ar: input.purpose === 'EMAIL_VERIFY' ? 'تحقق من بريدك الإلكتروني' : 'إعادة تعيين كلمة المرور',
      en: input.purpose === 'EMAIL_VERIFY' ? 'Verify your email' : 'Reset your password',
      tr: input.purpose === 'EMAIL_VERIFY' ? 'E-postanızı doğrulayın' : 'Şifrenizi sıfırlayın',
    }[locale];
    const text = {
      ar: `رمزك من Abou-Taleb Education هو ${input.code}. تنتهي صلاحيته خلال 10 دقائق.`,
      en: `Your Abou-Taleb Education code is ${input.code}. It expires in 10 minutes.`,
      tr: `Abou-Taleb Education kodunuz: ${input.code}. Kod 10 dakika içinde geçerliliğini yitirir.`,
    }[locale];
    await this.send({
      recipient: input.recipient,
      subject,
      text,
    });
  }

  async sendOrderNotification(input: DevelopmentOrderMessage) {
    const subject =
      input.event === 'submitted'
        ? `Application request received: ${input.reference}`
        : `Application request update: ${input.reference}`;
    await this.send({
      recipient: input.recipient,
      subject,
      text:
        input.event === 'submitted'
          ? `We received your application request ${input.reference}.`
          : `Your application request ${input.reference} is now ${input.newStatus ?? 'updated'}.`,
    });
  }

  private async send(email: ResendEmail) {
    try {
      const response = await this.fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: this.from,
          to: [email.recipient],
          subject: email.subject,
          text: email.text,
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
