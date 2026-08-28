import { describe, expect, it, vi } from 'vitest';
import { createOrderNotifier } from './notifier.js';
import type { EmailProvider } from '../auth/email.provider.js';

describe('order notifier', () => {
  it('forwards submitted notifications to the email provider', async () => {
    const emailProvider = {
      sendOtp: vi.fn(),
      sendOrderNotification: vi.fn(),
    } satisfies EmailProvider;
    const notifier = createOrderNotifier(emailProvider);

    await notifier.notifySubmitted({ recipient: 'client@example.com', reference: 'ATE-2026-ABCD' });

    expect(emailProvider.sendOrderNotification).toHaveBeenCalledWith({
      recipient: 'client@example.com',
      reference: 'ATE-2026-ABCD',
      event: 'submitted',
    });
  });

  it('swallows provider failures after the order transaction has completed', async () => {
    const emailProvider = {
      sendOtp: vi.fn(),
      sendOrderNotification: vi.fn().mockRejectedValue(new Error('provider unavailable')),
    } satisfies EmailProvider;
    const notifier = createOrderNotifier(emailProvider);

    await expect(
      notifier.notifyStatusChanged({
        recipient: 'client@example.com',
        reference: 'ATE-2026-ABCD',
        newStatus: 'CONTACTED',
        clientVisibleMessage: 'We are reviewing your request.',
      }),
    ).resolves.toBeUndefined();
    expect(emailProvider.sendOrderNotification).toHaveBeenCalledWith({
      recipient: 'client@example.com',
      reference: 'ATE-2026-ABCD',
      newStatus: 'CONTACTED',
      clientVisibleMessage: 'We are reviewing your request.',
      event: 'status_changed',
    });
  });
});
