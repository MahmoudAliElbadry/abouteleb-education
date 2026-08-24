import { apiFetch, csrfToken } from '../auth/auth-client.js';
import type { ManagedContactKey, SocialIconKey } from '@abou/contracts';

export type ManagedTestimonial = {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  clientNameTr: string;
  quoteAr: string;
  quoteEn: string;
  quoteTr: string;
  imageUrl: string | null;
  consentConfirmed: boolean;
  isPublished: boolean;
  archivedAt: string | null;
  sortOrder: number;
};
export type ManagedSocialLink = {
  id: string;
  platform: string;
  labelAr: string;
  labelEn: string;
  labelTr: string;
  url: string;
  iconKey: SocialIconKey;
  isVisible: boolean;
  archivedAt: string | null;
  sortOrder: number;
};
export type ManagedContact = { key: ManagedContactKey; value: string };
const write = { headers: { 'X-CSRF-Token': csrfToken() } };

export const getAdminTestimonials = () =>
  apiFetch<{ items: ManagedTestimonial[]; total: number }>(
    '/admin/testimonials?page=1&pageSize=100',
  );
export const createTestimonial = (input: Omit<ManagedTestimonial, 'id' | 'archivedAt'>) =>
  apiFetch<{ testimonial: ManagedTestimonial }>('/admin/testimonials', {
    method: 'POST',
    ...write,
    body: JSON.stringify(input),
  });
export const updateTestimonial = (id: string, input: Partial<ManagedTestimonial>) =>
  apiFetch<{ testimonial: ManagedTestimonial }>(`/admin/testimonials/${id}`, {
    method: 'PATCH',
    ...write,
    body: JSON.stringify(input),
  });
export const archiveTestimonial = (id: string) =>
  apiFetch(`/admin/testimonials/${id}/archive`, { method: 'POST', ...write });

export const getAdminSocialLinks = () =>
  apiFetch<{ items: ManagedSocialLink[]; total: number }>(
    '/admin/social-links?page=1&pageSize=100',
  );
export const createSocialLink = (input: Omit<ManagedSocialLink, 'id' | 'archivedAt'>) =>
  apiFetch<{ item: ManagedSocialLink }>('/admin/social-links', {
    method: 'POST',
    ...write,
    body: JSON.stringify(input),
  });
export const updateSocialLink = (id: string, input: Partial<ManagedSocialLink>) =>
  apiFetch<{ item: ManagedSocialLink }>(`/admin/social-links/${id}`, {
    method: 'PATCH',
    ...write,
    body: JSON.stringify(input),
  });
export const archiveSocialLink = (id: string) =>
  apiFetch(`/admin/social-links/${id}/archive`, { method: 'POST', ...write });
export const restoreSocialLink = (id: string) =>
  apiFetch(`/admin/social-links/${id}/restore`, { method: 'POST', ...write });
export const getAdminContact = () => apiFetch<{ items: ManagedContact[] }>('/admin/contact');
export const updateContact = (key: ManagedContactKey, value: string) =>
  apiFetch<{ item: ManagedContact }>(`/admin/contact/${key}`, {
    method: 'PUT',
    ...write,
    body: JSON.stringify({ value }),
  });
