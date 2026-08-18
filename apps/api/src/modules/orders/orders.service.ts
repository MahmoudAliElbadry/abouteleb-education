import { randomBytes } from 'node:crypto';
import { OrderStatus, Prisma, UserRole, type PrismaClient } from '@prisma/client';
import { appErrors, AppError } from '../../core/app-error.js';
import type { CreateOrderInput, Specialization } from '@abou/contracts';
import { assertTransition, isTerminal } from './order-state.js';

const specializationLabels: Record<Specialization, string> = {
  medicine: 'Medicine',
  dentistry: 'Dentistry',
  pharmacy: 'Pharmacy',
  engineering: 'Engineering',
  business: 'Business Administration',
};
const orderInclude = {
  statusHistory: { orderBy: { createdAt: 'asc' } },
  clientResponses: { orderBy: { createdAt: 'asc' } },
} satisfies Prisma.OrderInclude;

function createReference() {
  return `ATE-${new Date().getFullYear()}-${randomBytes(4).toString('hex').toUpperCase()}`;
}

function toPublicOrder(order: Prisma.OrderGetPayload<{ include: typeof orderInclude }>) {
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
    statusHistory: order.statusHistory.map((entry) => ({
      fromStatus: entry.fromStatus,
      toStatus: entry.toStatus,
      createdAt: entry.createdAt,
    })),
    responses: order.clientResponses.map((response) => ({
      body: response.body,
      createdAt: response.createdAt,
    })),
  };
}

export class OrdersService {
  constructor(private readonly prisma: PrismaClient) {}

  private async transitionOrder(
    orderId: string,
    clientId: string,
    toStatus: OrderStatus,
    actorId: string,
    actorRole: UserRole,
    ipAddress?: string,
  ) {
    await this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findFirst({ where: { id: orderId, clientId } });
      if (!order) throw appErrors.notFound();
      assertTransition(order.status, toStatus, actorRole);

      const updated = await transaction.order.updateMany({
        where: { id: order.id, status: order.status },
        data: { status: toStatus, ...(isTerminal(toStatus) ? { closedAt: new Date() } : {}) },
      });
      if (updated.count !== 1) {
        throw new AppError(
          'INVALID_ORDER_TRANSITION',
          409,
          'The application request changed before this action completed',
        );
      }
      await transaction.orderStatusHistory.create({
        data: { orderId: order.id, fromStatus: order.status, toStatus, changedByUserId: actorId },
      });
      await transaction.auditLog.create({
        data: {
          actorUserId: actorId,
          action: 'order.status_changed',
          entityType: 'Order',
          entityId: order.id,
          metadata: { reference: order.reference, fromStatus: order.status, toStatus },
          ipAddress: ipAddress ?? null,
        },
      });
    });
  }

  async create(
    client: { id: string; email: string; emailVerifiedAt: Date | null; role: string },
    input: CreateOrderInput,
    ipAddress?: string,
  ) {
    if (client.role !== 'CLIENT') throw new AppError('FORBIDDEN', 403, 'Client access required');
    if (!client.emailVerifiedAt) throw appErrors.emailNotVerified();

    const order = await this.prisma.$transaction(async (transaction) => {
      const created = await transaction.order.create({
        data: {
          reference: createReference(),
          clientId: client.id,
          fullName: input.fullName,
          email: client.email,
          phoneNumber: input.phoneNumber,
          specialization: input.specialization,
          specializationLabel: specializationLabels[input.specialization],
          statusHistory: { create: { toStatus: OrderStatus.NEW, changedByUserId: client.id } },
        },
        include: orderInclude,
      });
      await transaction.auditLog.create({
        data: {
          actorUserId: client.id,
          action: 'order.submitted',
          entityType: 'Order',
          entityId: created.id,
          metadata: { reference: created.reference, status: created.status },
          ipAddress: ipAddress ?? null,
        },
      });
      return created;
    });
    return toPublicOrder(order);
  }

  async listForClient(clientId: string) {
    const orders = await this.prisma.order.findMany({
      where: { clientId },
      include: orderInclude,
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(toPublicOrder);
  }

  async findOwned(orderId: string, clientId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, clientId },
      include: orderInclude,
    });
    if (!order) throw appErrors.notFound();
    return toPublicOrder(order);
  }

  async cancel(orderId: string, clientId: string, ipAddress?: string) {
    await this.transitionOrder(
      orderId,
      clientId,
      OrderStatus.CANCELLED,
      clientId,
      UserRole.CLIENT,
      ipAddress,
    );
  }

  async addResponse(orderId: string, clientId: string, body: string, ipAddress?: string) {
    return this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findFirst({
        where: { id: orderId, clientId, status: OrderStatus.WAITING_FOR_CLIENT },
      });
      if (!order) {
        throw new AppError(
          'INVALID_ORDER_TRANSITION',
          409,
          'A response is not requested for this application request',
        );
      }
      const existingResponse = await transaction.orderClientResponse.findFirst({
        where: { orderId },
      });
      if (existingResponse) {
        throw new AppError(
          'INVALID_ORDER_TRANSITION',
          409,
          'A response has already been submitted for this request',
        );
      }
      const createdResponse = await transaction.orderClientResponse.create({
        data: { orderId, clientId, body },
      });
      await transaction.auditLog.create({
        data: {
          actorUserId: clientId,
          action: 'order.client_responded',
          entityType: 'Order',
          entityId: orderId,
          metadata: { reference: order.reference },
          ipAddress: ipAddress ?? null,
        },
      });
      return {
        id: createdResponse.id,
        body: createdResponse.body,
        createdAt: createdResponse.createdAt,
      };
    });
  }
}
