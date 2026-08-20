import { describe, expect, it, vi } from 'vitest';
import { ResendEmailProvider } from './email.provider.js';

describe('ResendEmailProvider', () => {
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
