import { apiFetch, csrfToken } from '../auth/auth-client.js';
import type { UniversityCreateInput } from '@abou/contracts';

export type ManagedUniversity = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  nameTr: string;
  city: string;
  imageUrl: string;
  websiteUrl: string | null;
  featured: boolean;
  isPublished: boolean;
  archivedAt: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};
export type UniversityInput = UniversityCreateInput;
export type UniversityListResponse = {
  items: ManagedUniversity[];
  total: number;
  page: number;
  pageSize: number;
};

export function getAdminUniversities(query: {
  search?: string;
  isPublished?: string;
  page?: number;
}) {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: '20' });
  if (query.search) params.set('search', query.search);
  if (query.isPublished) params.set('isPublished', query.isPublished);
  return apiFetch<UniversityListResponse>(`/admin/universities?${params}`);
}
export function createUniversity(input: UniversityInput) {
  return apiFetch<{ university: ManagedUniversity }>('/admin/universities', {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken() },
    body: JSON.stringify(input),
  });
}
export function updateUniversity(id: string, input: Partial<UniversityInput>) {
  return apiFetch<{ university: ManagedUniversity }>(`/admin/universities/${id}`, {
    method: 'PATCH',
    headers: { 'X-CSRF-Token': csrfToken() },
    body: JSON.stringify(input),
  });
}
export function archiveUniversity(id: string) {
  return apiFetch<void>(`/admin/universities/${id}/archive`, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken() },
  });
}
export function restoreUniversity(id: string) {
  return apiFetch<void>(`/admin/universities/${id}/restore`, {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken() },
  });
}
