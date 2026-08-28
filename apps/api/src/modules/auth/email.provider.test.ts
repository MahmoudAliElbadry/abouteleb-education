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

    const request = fetcher.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      from: 'test@example.com',
      to: ['client@example.com'],
      subject: 'Verify your email',
      text: 'Your Abou-Taleb Education code is 123456. It expires in 10 minutes.',
    });
    expect(JSON.parse(String(request.body)).html).toContain(
      'https://aboutalebeducation.com/images/email-logo.png',
    );
    expect(JSON.parse(String(request.body)).html).toContain('#e30613');
  });

  it('sends an order status notification', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const provider = new ResendEmailProvider('test-key', 'test@example.com', fetcher);

    await provider.sendOrderNotification({
      recipient: 'client@example.com',
      reference: 'ATE-2026-ABCD',
      event: 'status_changed',
      newStatus: 'CONTACTED',
      clientVisibleMessage: 'We are reviewing your request.',
    });

    const request = fetcher.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      from: 'test@example.com',
      to: ['client@example.com'],
      subject: 'تحديث طلب التقديم | Application request update: ATE-2026-ABCD',
    });
    expect(JSON.parse(String(request.body)).html).toContain('ATE-2026-ABCD');
    expect(JSON.parse(String(request.body)).html).toContain('CONTACTED');
    expect(JSON.parse(String(request.body)).text).toContain(
      'Your application request ATE-2026-ABCD is now CONTACTED.',
    );
    expect(JSON.parse(String(request.body)).text).toContain('تم تحديث طلب التقديم');
    expect(JSON.parse(String(request.body)).html).toContain('We are reviewing your request.');
  });

  it('localizes OTP subject and body for the request locale', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const provider = new ResendEmailProvider('test-key', 'test@example.com', fetcher);

    await provider.sendOtp({
      recipient: 'client@example.com',
      code: '123456',
      purpose: 'PASSWORD_RESET',
      locale: 'tr',
    });

    const request = fetcher.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      subject: 'Şifrenizi sıfırlayın',
      text: 'Abou-Taleb Education kodunuz: 123456. Kod 10 dakika içinde geçerliliğini yitirir.',
    });
    expect(JSON.parse(String(request.body)).html).toContain('Şifrenizi sıfırlayın');
  });

  it('escapes dynamic values in the HTML while preserving the text fallback', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const provider = new ResendEmailProvider('test-key', 'test@example.com', fetcher);

    await provider.sendOrderNotification({
      recipient: 'client@example.com',
      reference: '<ATE&2026>',
      event: 'status_changed',
      newStatus: 'WAITING <CLIENT>',
    });

    const payload = JSON.parse(String((fetcher.mock.calls[0]?.[1] as RequestInit).body));
    expect(payload.text).toContain('<ATE&2026>');
    expect(payload.html).toContain('&lt;ATE&amp;2026&gt;');
    expect(payload.html).toContain('WAITING &lt;CLIENT&gt;');
    expect(payload.html).not.toContain('<ATE&2026>');
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
