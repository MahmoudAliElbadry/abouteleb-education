import { OrderStatus, Prisma, UserRole, UserStatus, type PrismaClient } from '@prisma/client';
import type { AdminOrderListQuery, OrderStatusTransitionInput } from '@abou/contracts';
import { appErrors, AppError } from '../../core/app-error.js';
import { assertTransition, isTerminal } from '../orders/order-state.js';

const adminOrderInclude = {
  client: {
    select: {
      id: true,
      email: true,
      profile: { select: { fullName: true } },
    },
  },
  assignedAdmin: {
    select: {
      id: true,
      email: true,
      profile: { select: { fullName: true } },
    },
  },
  statusHistory: {
    orderBy: { createdAt: 'asc' },
    include: {
      changedByUser: { select: { id: true, email: true, role: true } },
    },
  },
  clientResponses: {
    orderBy: { createdAt: 'asc' },
    include: { client: { select: { id: true, email: true } } },
  },
  internalNotes: {
    orderBy: { createdAt: 'asc' },
    include: { admin: { select: { id: true, email: true } } },
  },
} satisfies Prisma.OrderInclude;

type AdminOrder = Prisma.OrderGetPayload<{ include: typeof adminOrderInclude }>;

function serializeAdminOrder(order: AdminOrder) {
  return {
    id: order.id,
    reference: order.reference,
    fullName: order.fullName,
    email: order.email,
    phoneNumber: order.phoneNumber,
    specialization: order.specialization,
    specializationLabel: order.specializationLabel,
    status: order.status,
    submittedAt: order.submittedAt,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    closedAt: order.closedAt,
    client: order.client,
    assignedAdmin: order.assignedAdmin,
    statusHistory: order.statusHistory.map((entry) => ({
      id: entry.id,
      fromStatus: entry.fromStatus,
      toStatus: entry.toStatus,
      clientVisibleMessage: entry.clientVisibleMessage,
      createdAt: entry.createdAt,
      changedByUser: entry.changedByUser,
    })),
    clientResponses: order.clientResponses.map((response) => ({
      id: response.id,
      body: response.body,
      createdAt: response.createdAt,
      client: response.client,
    })),
    internalNotes: order.internalNotes.map((note) => ({
      id: note.id,
      body: note.body,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      admin: note.admin,
    })),
  };
}

export class AdminOrdersService {
  constructor(private readonly prisma: PrismaClient) {}

  async metrics() {
    const grouped = await this.prisma.order.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const counts = Object.fromEntries(
      Object.values(OrderStatus).map((status) => [status, 0]),
    ) as Record<OrderStatus, number>;
    for (const group of grouped) counts[group.status] = group._count._all;
    return { counts, total: grouped.reduce((total, group) => total + group._count._all, 0) };
  }

  async list(query: AdminOrderListQuery) {
    const where: Prisma.OrderWhereInput = {
      ...(query.status ? { status: query.status as OrderStatus } : {}),
      ...(query.specialization ? { specialization: query.specialization } : {}),
      ...(query.assignedAdminId ? { assignedAdminId: query.assignedAdminId } : {}),
      ...(query.search
        ? {
            OR: [
              { reference: { contains: query.search, mode: 'insensitive' } },
              { fullName: { contains: query.search, mode: 'insensitive' } },
              { email: { contains: query.search, mode: 'insensitive' } },
              { phoneNumber: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const orderBy = { [query.sort]: query.order } as Prisma.OrderOrderByWithRelationInput;
    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        orderBy,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        include: {
          assignedAdmin: {
            select: { id: true, email: true, profile: { select: { fullName: true } } },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);
    return {
      orders: orders.map((order) => ({
        id: order.id,
        reference: order.reference,
        fullName: order.fullName,
        email: order.email,
        phoneNumber: order.phoneNumber,
        specialization: order.specialization,
        specializationLabel: order.specializationLabel,
        status: order.status,
        assignedAdmin: order.assignedAdmin,
        submittedAt: order.submittedAt,
        updatedAt: order.updatedAt,
        closedAt: order.closedAt,
      })),
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: Math.ceil(total / query.pageSize),
      },
    };
  }

  async findById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: adminOrderInclude,
    });
    if (!order) throw appErrors.notFound();
    return serializeAdminOrder(order);
  }

  async assign(
    orderId: string,
    assignedAdminId: string | null,
    actorId: string,
    ipAddress?: string,
  ) {
    if (assignedAdminId) {
      const admin = await this.prisma.user.findFirst({
        where: { id: assignedAdminId, role: UserRole.ADMIN, status: UserStatus.ACTIVE },
        select: { id: true },
      });
      if (!admin) throw appErrors.invalidAssignment();
    }
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, reference: true },
    });
    if (!order) throw appErrors.notFound();
    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { assignedAdminId },
      select: { id: true, assignedAdminId: true },
    });
    await this.prisma.auditLog.create({
      data: {
        actorUserId: actorId,
        action: 'order.assignment_changed',
        entityType: 'Order',
        entityId: order.id,
        metadata: { reference: order.reference, assignedAdminId },
        ipAddress: ipAddress ?? null,
      },
    });
    return updated;
  }

  async transition(
    orderId: string,
    input: OrderStatusTransitionInput,
    actorId: string,
    ipAddress?: string,
  ) {
    return this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findUnique({
        where: { id: orderId },
        select: { id: true, reference: true, status: true },
      });
      if (!order) throw appErrors.notFound();
      const toStatus = input.to as OrderStatus;
      assertTransition(order.status, toStatus, UserRole.ADMIN);
      const updated = await transaction.order.updateMany({
        where: { id: order.id, status: order.status },
        data: { status: toStatus, closedAt: isTerminal(toStatus) ? new Date() : null },
      });
      if (updated.count !== 1) {
        throw new AppError(
          'INVALID_ORDER_TRANSITION',
          409,
          'The application request changed before this action completed',
        );
      }
      await transaction.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: order.status,
          toStatus,
          clientVisibleMessage: input.clientVisibleMessage ?? null,
          changedByUserId: actorId,
        },
      });
      await transaction.auditLog.create({
        data: {
          actorUserId: actorId,
          action: 'order.status_changed',
          entityType: 'Order',
          entityId: order.id,
          metadata: {
            reference: order.reference,
            fromStatus: order.status,
            toStatus,
            hasClientVisibleMessage: Boolean(input.clientVisibleMessage),
          },
          ipAddress: ipAddress ?? null,
        },
      });
      return {
        orderId: order.id,
        reference: order.reference,
        fromStatus: order.status,
        toStatus,
        clientVisibleMessage: input.clientVisibleMessage ?? null,
      };
    });
  }

  async addInternalNote(orderId: string, body: string, adminId: string, ipAddress?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, reference: true },
    });
    if (!order) throw appErrors.notFound();
    const note = await this.prisma.orderInternalNote.create({
      data: { orderId, adminId, body },
      select: {
        id: true,
        orderId: true,
        adminId: true,
        body: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    await this.prisma.auditLog.create({
      data: {
        actorUserId: adminId,
        action: 'order.internal_note_added',
        entityType: 'Order',
        entityId: order.id,
        metadata: { reference: order.reference, noteId: note.id },
        ipAddress: ipAddress ?? null,
      },
    });
    return note;
  }
}
