import { OrderStatus, UserRole } from '@prisma/client';
import { AppError } from '../../core/app-error.js';

export const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.NEW]: [OrderStatus.CONTACTED, OrderStatus.REJECTED, OrderStatus.CANCELLED],
  [OrderStatus.CONTACTED]: [OrderStatus.WAITING_FOR_CLIENT, OrderStatus.IN_PROGRESS],
  [OrderStatus.WAITING_FOR_CLIENT]: [OrderStatus.IN_PROGRESS],
  [OrderStatus.IN_PROGRESS]: [OrderStatus.COMPLETED, OrderStatus.REJECTED, OrderStatus.CANCELLED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.REJECTED]: [],
  [OrderStatus.CANCELLED]: [],
};

export const TERMINAL_STATUSES: OrderStatus[] = [
  OrderStatus.COMPLETED,
  OrderStatus.REJECTED,
  OrderStatus.CANCELLED,
];

export const CLIENT_CANCELLABLE_STATUSES: OrderStatus[] = [
  OrderStatus.NEW,
  OrderStatus.CONTACTED,
  OrderStatus.WAITING_FOR_CLIENT,
];

export function isTerminal(status: OrderStatus) {
  return TERMINAL_STATUSES.includes(status);
}

export function canTransition(from: OrderStatus, to: OrderStatus, role: UserRole) {
  if (role === UserRole.CLIENT) {
    return to === OrderStatus.CANCELLED && CLIENT_CANCELLABLE_STATUSES.includes(from);
  }
  return ORDER_TRANSITIONS[from].includes(to);
}

export function assertTransition(from: OrderStatus, to: OrderStatus, role: UserRole) {
  if (!canTransition(from, to, role)) {
    throw new AppError(
      'INVALID_ORDER_TRANSITION',
      409,
      'This application request cannot move to that status',
    );
  }
}
