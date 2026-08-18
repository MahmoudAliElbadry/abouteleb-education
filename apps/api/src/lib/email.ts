import { env } from '../config/env.js';

type VerificationEmail = {
  recipient: string;
  code: string;
  purpose: 'EMAIL_VERIFY' | 'PASSWORD_RESET';
};

export async function sendVerificationEmail({ recipient, code, purpose }: VerificationEmail) {
  const subject =
    purpose === 'EMAIL_VERIFY' ? 'Verify your Abou-Taleb Education account' : 'Reset your password';

  if (!env.RESEND_API_KEY) {
    if (env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY is required in production');
    }

    console.info(`[development email] ${subject} to ${recipient}; OTP: ${code}`);
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [recipient],
      subject,
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned HTTP ${response.status}`);
  }
}
