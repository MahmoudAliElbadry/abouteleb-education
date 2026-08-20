import { describe, expect, it, vi } from 'vitest';
import { ResendEmailProvider } from './email.provider.js';

describe('ResendEmailProvider', () => {
  it('sends a verification email with the expected provider payload', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const provider = new ResendEmailProvider('test-key', 'test@example.com', fetcher);

    await provider.sendOtp({
      recipient: 'client@example.com',
      code: '123456',
      purpose: 'EMAIL_VERIFY',
    });

    expect(fetcher).toHaveBeenCalledWith('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer test-key', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'test@example.com',
        to: ['client@example.com'],
        subject: 'Verify your email',
        text: 'Your Abou-Taleb Education code is 123456. It expires in 10 minutes.',
      }),
    });
  });

  it('sends an order status notification', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const provider = new ResendEmailProvider('test-key', 'test@example.com', fetcher);

    await provider.sendOrderNotification({
      recipient: 'client@example.com',
      reference: 'ATE-2026-ABCD',
      event: 'status_changed',
      newStatus: 'CONTACTED',
    });

    const request = fetcher.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      from: 'test@example.com',
      to: ['client@example.com'],
      subject: 'Application request update: ATE-2026-ABCD',
      text: 'Your application request ATE-2026-ABCD is now CONTACTED.',
    });
  });

  it('maps provider failures to a safe application error', async () => {
    const provider = new ResendEmailProvider(
      'test-key',
      'test@example.com',
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );

    await expect(
      provider.sendOtp({
        recipient: 'client@example.com',
        code: '123456',
        purpose: 'EMAIL_VERIFY',
      }),
    ).rejects.toMatchObject({ code: 'EMAIL_DELIVERY_FAILED', status: 503 });
  });
});
