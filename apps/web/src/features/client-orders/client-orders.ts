import { ApiError, apiFetch } from '../auth/auth-client.js';

export type ClientOrder = {
  id: string;
  reference: string;
  specializationLabel: string;
  status: string;
  submittedAt: string;
  statusHistory: Array<{
    fromStatus: string | null;
    toStatus: string;
    clientVisibleMessage: string | null;
    createdAt: string;
  }>;
};

export type ClientOrdersResponse = {
  items: ClientOrder[];
  total: number;
  page: number;
  pageSize: number;
};

export function getClientOrders(page = 1): Promise<ClientOrdersResponse> {
  return apiFetch<ClientOrdersResponse>(`/orders?page=${page}&pageSize=10`);
}

export function clientOrderErrorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}
