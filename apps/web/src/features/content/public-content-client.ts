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

export type PublicTestimonial = {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  clientNameTr: string;
  quoteAr: string;
  quoteEn: string;
  quoteTr: string;
  imageUrl: string | null;
};
export type PublicSocialLink = {
  id: string;
  platform: string;
  labelAr: string;
  labelEn: string;
  labelTr: string;
  url: string;
  iconKey: string;
};
export type PublicContact = { key: string; value: string };
export const getPublicTestimonials = () =>
  apiFetch<{ items: PublicTestimonial[] }>('/testimonials');
export const getPublicSocialLinks = () => apiFetch<{ items: PublicSocialLink[] }>('/social-links');
export const getPublicContact = () => apiFetch<{ items: PublicContact[] }>('/contact');
