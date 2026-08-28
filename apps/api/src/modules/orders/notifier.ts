import { logger } from '../../core/logger.js';
import type { EmailProvider } from '../auth/email.provider.js';

export function createOrderNotifier(emailProvider: EmailProvider) {
  async function notify(input: {
    recipient: string;
    reference: string;
    event: 'submitted' | 'status_changed';
    newStatus?: string;
    clientVisibleMessage?: string;
  }) {
    try {
      await emailProvider.sendOrderNotification(input);
    } catch (error) {
      logger.warn('order.notification_failed', {
        reference: input.reference,
        event: input.event,
        errorName: error instanceof Error ? error.name : 'UnknownError',
      });
    }
  }

  return {
    notifySubmitted: (input: { recipient: string; reference: string }) =>
      notify({ ...input, event: 'submitted' }),
    notifyStatusChanged: (input: {
      recipient: string;
      reference: string;
      newStatus: string;
      clientVisibleMessage?: string;
    }) => notify({ ...input, event: 'status_changed' }),
  };
}
