import { describe, expect, it } from 'vitest';
import { OrderStatus, UserRole } from '@prisma/client';
import {
  CLIENT_CANCELLABLE_STATUSES,
  ORDER_TRANSITIONS,
  TERMINAL_STATUSES,
  assertTransition,
  canTransition,
  isTerminal,
} from './order-state.js';

describe('order state machine', () => {
  it('allows every documented admin edge and denies non-edges', () => {
    for (const [from, targets] of Object.entries(ORDER_TRANSITIONS)) {
      for (const to of Object.values(OrderStatus)) {
        expect(canTransition(from as OrderStatus, to, UserRole.ADMIN)).toBe(targets.includes(to));
      }
    }
  });

  it('allows client cancellation only from the approved pre-processing statuses', () => {
    for (const from of CLIENT_CANCELLABLE_STATUSES) {
      expect(canTransition(from, OrderStatus.CANCELLED, UserRole.CLIENT)).toBe(true);
    }
    expect(canTransition(OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED, UserRole.CLIENT)).toBe(
      false,
    );
    expect(canTransition(OrderStatus.CANCELLED, OrderStatus.CANCELLED, UserRole.CLIENT)).toBe(
      false,
    );
    expect(canTransition(OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED, UserRole.ADMIN)).toBe(
      true,
    );
  });

  it('defines exactly the three terminal statuses', () => {
    expect(TERMINAL_STATUSES).toEqual([
      OrderStatus.COMPLETED,
      OrderStatus.REJECTED,
      OrderStatus.CANCELLED,
    ]);
    expect(TERMINAL_STATUSES.every(isTerminal)).toBe(true);
    expect(isTerminal(OrderStatus.NEW)).toBe(false);
  });

  it('throws the typed conflict for invalid transitions', () => {
    expect(() =>
      assertTransition(OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED, UserRole.CLIENT),
    ).toThrow(expect.objectContaining({ code: 'INVALID_ORDER_TRANSITION', status: 409 }));
  });
});
