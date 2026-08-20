import { OrderStatus, UserRole, type PrismaClient } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { AdminOrdersService } from './admin-orders.service.js';

function serviceWith(prisma: Record<string, unknown>) {
  return new AdminOrdersService(prisma as unknown as PrismaClient);
}

describe('AdminOrdersService', () => {
  it('groups metrics across every known status', async () => {
    const prisma = {
      order: {
        groupBy: vi.fn().mockResolvedValue([
          { status: OrderStatus.NEW, _count: { _all: 2 } },
          { status: OrderStatus.COMPLETED, _count: { _all: 1 } },
        ]),
      },
    };

    const metrics = await serviceWith(prisma).metrics();

    expect(metrics.total).toBe(3);
    expect(metrics.counts.NEW).toBe(2);
    expect(metrics.counts.COMPLETED).toBe(1);
    expect(metrics.counts.CANCELLED).toBe(0);
  });

  it('returns paginated filtered orders with total pages', async () => {
    const order = {
      id: 'order-1',
      reference: 'ATE-2026-ABCD',
      fullName: 'Client Name',
      email: 'client@example.com',
      phoneNumber: '+90500000000',
      specialization: 'medicine',
      specializationLabel: 'Medicine',
      status: OrderStatus.NEW,
      assignedAdmin: null,
      submittedAt: new Date(),
      updatedAt: new Date(),
      closedAt: null,
    };
    const prisma = {
      order: { findMany: vi.fn(), count: vi.fn() },
      $transaction: vi.fn().mockResolvedValue([[order], 21]),
    };

    const result = await serviceWith(prisma).list({
      status: 'NEW',
      sort: 'createdAt',
      order: 'desc',
      page: 2,
      pageSize: 10,
    });

    expect(result.orders).toHaveLength(1);
    expect(result.pagination).toMatchObject({ page: 2, pageSize: 10, total: 21, totalPages: 3 });
    expect(prisma.$transaction).toHaveBeenCalledOnce();
  });

  it('records a client-visible message when an admin changes status', async () => {
    const transaction = {
      order: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'order-1',
          reference: 'ATE-2026-ABCD',
          email: 'client@example.com',
          status: OrderStatus.NEW,
        }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      orderStatusHistory: { create: vi.fn() },
      auditLog: { create: vi.fn() },
    };
    const prisma = { $transaction: vi.fn((callback) => callback(transaction)) };

    const result = await serviceWith(prisma).transition(
      'order-1',
      { to: 'CONTACTED', clientVisibleMessage: 'We are reviewing your request.' },
      'admin-1',
      '127.0.0.1',
    );

    expect(result).toMatchObject({
      reference: 'ATE-2026-ABCD',
      recipient: 'client@example.com',
      fromStatus: OrderStatus.NEW,
      toStatus: OrderStatus.CONTACTED,
    });
    expect(transaction.orderStatusHistory.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ clientVisibleMessage: 'We are reviewing your request.' }),
    });
  });

  it('rejects illegal admin transitions and never writes history', async () => {
    const transaction = {
      order: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'order-1',
          reference: 'ATE-2026-ABCD',
          email: 'client@example.com',
          status: OrderStatus.COMPLETED,
        }),
        updateMany: vi.fn(),
      },
      orderStatusHistory: { create: vi.fn() },
      auditLog: { create: vi.fn() },
    };
    const prisma = { $transaction: vi.fn((callback) => callback(transaction)) };

    await expect(
      serviceWith(prisma).transition('order-1', { to: 'NEW' }, 'admin-1'),
    ).rejects.toMatchObject({ code: 'INVALID_ORDER_TRANSITION' });
    expect(transaction.order.updateMany).not.toHaveBeenCalled();
    expect(transaction.orderStatusHistory.create).not.toHaveBeenCalled();
  });

  it('requires an active admin for assignment', async () => {
    const prisma = { user: { findFirst: vi.fn().mockResolvedValue(null) } };

    await expect(
      serviceWith(prisma).assign('order-1', 'client-1', 'admin-1'),
    ).rejects.toMatchObject({
      code: 'INVALID_ASSIGNMENT',
    });
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 'client-1', role: UserRole.ADMIN, status: 'ACTIVE' },
      select: { id: true },
    });
  });

  it('audits internal notes without exposing them in client data', async () => {
    const prisma = {
      order: {
        findUnique: vi.fn().mockResolvedValue({ id: 'order-1', reference: 'ATE-2026-ABCD' }),
        create: vi.fn(),
      },
      orderInternalNote: {
        create: vi.fn().mockResolvedValue({
          id: 'note-1',
          orderId: 'order-1',
          adminId: 'admin-1',
          body: 'Call client tomorrow.',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      },
      auditLog: { create: vi.fn() },
    };

    const note = await serviceWith(prisma).addInternalNote(
      'order-1',
      'Call client tomorrow.',
      'admin-1',
    );

    expect(note.body).toBe('Call client tomorrow.');
    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'order.internal_note_added' }),
    });
  });
});
