import type { OrderStatusValue, Specialization } from '@abou/contracts';
import { apiFetch, csrfToken } from '../auth/auth-client.js';

export type AdminOrderSummary = {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  specialization: Specialization;
  specializationLabel: string;
  status: OrderStatusValue;
  submittedAt: string;
  updatedAt: string;
  closedAt: string | null;
};

export type AdminOrderDetail = AdminOrderSummary & {
  createdAt: string;
  client: { id: string; email: string; profile: { fullName: string } | null };
  statusHistory: Array<{
    id: string;
    fromStatus: OrderStatusValue | null;
    toStatus: OrderStatusValue;
    clientVisibleMessage: string | null;
    createdAt: string;
    changedByUser: { id: string; email: string; role: string } | null;
  }>;
  clientResponses: Array<{
    id: string;
    body: string;
    createdAt: string;
    client: { id: string; email: string };
  }>;
  internalNotes: Array<{
    id: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    admin: { id: string; email: string } | null;
  }>;
};

export type AdminMetrics = { counts: Record<OrderStatusValue, number>; total: number };

export function getAdminMetrics() {
  return apiFetch<AdminMetrics>('/admin/orders/metrics');
}

export function getAdminOrders(query: {
  status?: string;
  specialization?: string;
  search?: string;
  sort?: string;
  order?: string;
  page: number;
  pageSize: number;
}) {
  const params = new URLSearchParams({
    page: String(query.page),
    pageSize: String(query.pageSize),
  });
  for (const key of ['status', 'specialization', 'search', 'sort', 'order'] as const)
    if (query[key]) params.set(key, query[key]!);
  return apiFetch<{
    items: AdminOrderSummary[];
    total: number;
    page: number;
    pageSize: number;
  }>(`/admin/orders?${params}`);
}

export function getAdminOrder(id: string) {
  return apiFetch<{ order: AdminOrderDetail }>(`/admin/orders/${id}`);
}

export function transitionAdminOrder(
  orderId: string,
  input: { to: OrderStatusValue; clientVisibleMessage?: string },
) {
  return apiFetch(`/admin/orders/${orderId}/status`, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken() },
    body: JSON.stringify(input),
  });
}

export function addInternalNote(orderId: string, body: string) {
  return apiFetch(`/admin/orders/${orderId}/internal-notes`, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken() },
    body: JSON.stringify({ body }),
  });
}
