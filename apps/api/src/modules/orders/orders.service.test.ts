import { OrderStatus } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { OrdersService } from './orders.service.js';

function prismaStub(overrides: Record<string, unknown> = {}) {
  const transaction = {
    order: { findFirst: vi.fn(), updateMany: vi.fn() },
    orderStatusHistory: { create: vi.fn() },
    orderClientResponse: { findFirst: vi.fn(), create: vi.fn() },
    auditLog: { create: vi.fn() },
  };
  const prisma = {
    $transaction: vi.fn(async (callback: (tx: typeof transaction) => unknown) =>
      callback(transaction),
    ),
    ...overrides,
  };
  return { prisma: prisma as never, transaction };
}

const order = { id: 'order-1', reference: 'ATE-2026-ABCD', status: OrderStatus.NEW };

describe('OrdersService status and response guards', () => {
  it('cancels atomically and writes a continuous history/audit record', async () => {
    const { prisma, transaction } = prismaStub();
    vi.mocked(transaction.order.findFirst).mockResolvedValue(order);
    vi.mocked(transaction.order.updateMany).mockResolvedValue({ count: 1 });
    const service = new OrdersService(prisma);

    await service.cancel(order.id, 'client-1');

    expect(transaction.order.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: order.id, status: OrderStatus.NEW },
        data: expect.objectContaining({
          status: OrderStatus.CANCELLED,
          closedAt: expect.any(Date),
        }),
      }),
    );
    expect(transaction.orderStatusHistory.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        fromStatus: OrderStatus.NEW,
        toStatus: OrderStatus.CANCELLED,
      }),
    });
    expect(transaction.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'order.status_changed' }),
    });
  });

  it('rejects an in-progress client cancellation', async () => {
    const { prisma, transaction } = prismaStub();
    vi.mocked(transaction.order.findFirst).mockResolvedValue({
      ...order,
      status: OrderStatus.IN_PROGRESS,
    });

    await expect(new OrdersService(prisma).cancel(order.id, 'client-1')).rejects.toMatchObject({
      code: 'INVALID_ORDER_TRANSITION',
      status: 409,
    });
    expect(transaction.order.updateMany).not.toHaveBeenCalled();
  });

  it('rejects when the conditional status write loses a race', async () => {
    const { prisma, transaction } = prismaStub();
    vi.mocked(transaction.order.findFirst).mockResolvedValue(order);
    vi.mocked(transaction.order.updateMany).mockResolvedValue({ count: 0 });

    await expect(new OrdersService(prisma).cancel(order.id, 'client-1')).rejects.toMatchObject({
      code: 'INVALID_ORDER_TRANSITION',
      status: 409,
    });
  });

  it('rejects cancellation of a missing order', async () => {
    const { prisma, transaction } = prismaStub();
    vi.mocked(transaction.order.findFirst).mockResolvedValue(null);
    await expect(new OrdersService(prisma).cancel(order.id, 'client-1')).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('returns one response receipt and rejects a duplicate response', async () => {
    const { prisma, transaction } = prismaStub();
    vi.mocked(transaction.order.findFirst).mockResolvedValue({
      ...order,
      status: OrderStatus.WAITING_FOR_CLIENT,
    });
    vi.mocked(transaction.orderClientResponse.findFirst).mockResolvedValue(null);
    vi.mocked(transaction.orderClientResponse.create).mockResolvedValue({
      id: 'response-1',
      body: 'Done',
      createdAt: new Date(),
    });
    const service = new OrdersService(prisma);

    await expect(service.addResponse(order.id, 'client-1', 'Done')).resolves.toMatchObject({
      id: 'response-1',
      body: 'Done',
    });
    expect(transaction.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'order.client_responded' }),
    });

    vi.mocked(transaction.orderClientResponse.findFirst).mockResolvedValue({ id: 'response-1' });
    await expect(service.addResponse(order.id, 'client-1', 'Again')).rejects.toMatchObject({
      code: 'INVALID_ORDER_TRANSITION',
      status: 409,
    });
  });
});
