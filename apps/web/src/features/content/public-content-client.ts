import { apiFetch } from '../auth/auth-client.js';

export type PublicUniversity = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  nameTr: string;
  city: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
};

export function getPublicUniversities() {
  return apiFetch<{ items: PublicUniversity[] }>('/universities');
}
