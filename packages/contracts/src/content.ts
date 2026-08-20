import { z } from 'zod';

const managedTextSchema = z.string().trim().min(1).max(500);
const managedSummarySchema = z.string().trim().min(1).max(2_000);
const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(120);
export const httpsUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => value.startsWith('https://'), 'Only HTTPS URLs are allowed');
export const imageRefSchema = z.union([
  httpsUrlSchema,
  z.string().regex(/^\/images\/[a-z0-9-]+\.(png|svg|webp|jpe?g)$/),
]);
const sortOrderSchema = z.number().int().finite().min(0).max(1_000_000);

export const universityCreateSchema = z.object({
  slug: slugSchema,
  nameAr: managedTextSchema,
  nameEn: managedTextSchema,
  nameTr: managedTextSchema,
  summaryAr: managedSummarySchema,
  summaryEn: managedSummarySchema,
  summaryTr: managedSummarySchema,
  city: managedTextSchema.max(120),
  imageUrl: imageRefSchema,
  websiteUrl: httpsUrlSchema.nullable().optional(),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  sortOrder: sortOrderSchema.default(0),
});
export const universityUpdateSchema = universityCreateSchema.partial();
export const managedContentListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(120).optional(),
  isPublished: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
});
const testimonialFieldsSchema = z.object({
  clientNameAr: managedTextSchema,
  clientNameEn: managedTextSchema,
  clientNameTr: managedTextSchema,
  quoteAr: managedSummarySchema,
  quoteEn: managedSummarySchema,
  quoteTr: managedSummarySchema,
  imageUrl: imageRefSchema.nullable().optional(),
  consentConfirmed: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  sortOrder: sortOrderSchema.default(0),
});
export const testimonialCreateSchema = testimonialFieldsSchema.superRefine((value, context) => {
  if (value.isPublished && !value.consentConfirmed)
    context.addIssue({
      code: 'custom',
      path: ['consentConfirmed'],
      message: 'Publication requires consent',
    });
});
export const testimonialUpdateSchema = testimonialFieldsSchema.partial();
export const testimonialPublicationUpdateSchema = z
  .object({ isPublished: z.boolean(), consentConfirmed: z.boolean() })
  .superRefine((value, context) => {
    if (value.isPublished && !value.consentConfirmed)
      context.addIssue({
        code: 'custom',
        path: ['consentConfirmed'],
        message: 'Publication requires consent',
      });
  });
export const socialIconKeySchema = z.enum([
  'whatsapp',
  'facebook',
  'instagram',
  'telegram',
  'x',
  'linkedin',
]);
export const socialLinkCreateSchema = z.object({
  platform: managedTextSchema.max(80),
  labelAr: managedTextSchema,
  labelEn: managedTextSchema,
  labelTr: managedTextSchema,
  url: httpsUrlSchema,
  iconKey: socialIconKeySchema,
  isVisible: z.boolean().default(true),
  sortOrder: sortOrderSchema.default(0),
});
export const socialLinkUpdateSchema = socialLinkCreateSchema.partial();
export const CONTACT_KEYS = [
  'contact_phone',
  'contact_email_primary',
  'contact_email_secondary',
  'contact_whatsapp',
] as const;
export const managedContactKeySchema = z.enum(CONTACT_KEYS);
export const managedContactUpsertSchema = z.object({
  key: managedContactKeySchema,
  value: managedTextSchema.max(500),
});
const managedTimestampsSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const universityPublicSchema = managedTimestampsSchema.extend({
  slug: slugSchema,
  nameAr: managedTextSchema,
  nameEn: managedTextSchema,
  nameTr: managedTextSchema,
  summaryAr: managedSummarySchema,
  summaryEn: managedSummarySchema,
  summaryTr: managedSummarySchema,
  city: managedTextSchema.max(120),
  imageUrl: imageRefSchema,
  websiteUrl: httpsUrlSchema.nullable(),
  featured: z.boolean(),
  sortOrder: sortOrderSchema,
});
export const universityAdminSchema = universityPublicSchema.extend({
  isPublished: z.boolean(),
  archivedAt: z.string().datetime().nullable(),
});
export const testimonialPublicSchema = managedTimestampsSchema.extend({
  clientNameAr: managedTextSchema,
  clientNameEn: managedTextSchema,
  clientNameTr: managedTextSchema,
  quoteAr: managedSummarySchema,
  quoteEn: managedSummarySchema,
  quoteTr: managedSummarySchema,
  imageUrl: imageRefSchema.nullable(),
  sortOrder: sortOrderSchema,
});
export const socialLinkPublicSchema = managedTimestampsSchema.extend({
  platform: managedTextSchema.max(80),
  labelAr: managedTextSchema,
  labelEn: managedTextSchema,
  labelTr: managedTextSchema,
  url: httpsUrlSchema,
  iconKey: socialIconKeySchema,
  sortOrder: sortOrderSchema,
});
export const managedContactSchema = z.object({
  key: managedContactKeySchema,
  value: managedTextSchema.max(500),
});
export type UniversityCreateInput = z.infer<typeof universityCreateSchema>;
export type UniversityUpdateInput = z.infer<typeof universityUpdateSchema>;
export type ManagedContentListQuery = z.infer<typeof managedContentListQuerySchema>;
export type TestimonialCreateInput = z.infer<typeof testimonialCreateSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
export type SocialLinkCreateInput = z.infer<typeof socialLinkCreateSchema>;
export type SocialLinkUpdateInput = z.infer<typeof socialLinkUpdateSchema>;
export type SocialIconKey = z.infer<typeof socialIconKeySchema>;
export type ManagedContactKey = z.infer<typeof managedContactKeySchema>;
export type ManagedContactUpsertInput = z.infer<typeof managedContactUpsertSchema>;
export type UniversityPublic = z.infer<typeof universityPublicSchema>;
export type UniversityAdmin = z.infer<typeof universityAdminSchema>;
export type TestimonialPublic = z.infer<typeof testimonialPublicSchema>;
export type SocialLinkPublic = z.infer<typeof socialLinkPublicSchema>;
export type ManagedContact = z.infer<typeof managedContactSchema>;
