import { z } from 'zod';

export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const specializationSchema = z.enum([
  'medicine',
  'dentistry',
  'pharmacy',
  'engineering',
  'business',
]);

export const orderStatusSchema = z.enum([
  'NEW',
  'CONTACTED',
  'WAITING_FOR_CLIENT',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
  'CANCELLED',
]);

export const createOrderSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phoneNumber: z.string().trim().min(7).max(32),
  specialization: specializationSchema,
});

export const clientOrderListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
});

export const orderResponseSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});

export const adminOrderListQuerySchema = z.object({
  status: orderStatusSchema.optional(),
  specialization: specializationSchema.optional(),
  assignedAdminId: z.string().trim().min(1).optional(),
  search: z.string().trim().max(120).optional(),
  sort: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

const managedTextSchema = z.string().trim().min(1).max(500);
const managedSummarySchema = z.string().trim().min(1).max(2_000);
const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(120);
const httpsUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => value.startsWith('https://'), 'Only HTTPS URLs are allowed');
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
  imageUrl: httpsUrlSchema,
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
  isPublished: z.coerce.boolean().optional(),
});

const testimonialPublicationSchema = z.object({
  isPublished: z.boolean(),
  consentConfirmed: z.boolean(),
});
const testimonialFieldsSchema = z.object({
  clientNameAr: managedTextSchema,
  clientNameEn: managedTextSchema,
  clientNameTr: managedTextSchema,
  quoteAr: managedSummarySchema,
  quoteEn: managedSummarySchema,
  quoteTr: managedSummarySchema,
  imageUrl: httpsUrlSchema.nullable().optional(),
  consentConfirmed: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  sortOrder: sortOrderSchema.default(0),
});
export const testimonialCreateSchema = testimonialFieldsSchema.superRefine((value, context) => {
  if (value.isPublished && !value.consentConfirmed) {
    context.addIssue({
      code: 'custom',
      path: ['consentConfirmed'],
      message: 'Publication requires consent',
    });
  }
});
export const testimonialUpdateSchema = testimonialFieldsSchema
  .partial()
  .superRefine((value, context) => {
    if (value.isPublished === true && value.consentConfirmed !== true) {
      context.addIssue({
        code: 'custom',
        path: ['consentConfirmed'],
        message: 'Publication requires consent',
      });
    }
  });
export const testimonialPublicationUpdateSchema = testimonialPublicationSchema.superRefine(
  (value, context) => {
    if (value.isPublished && !value.consentConfirmed) {
      context.addIssue({
        code: 'custom',
        path: ['consentConfirmed'],
        message: 'Publication requires consent',
      });
    }
  },
);

export const socialIconKeySchema = z.enum(['whatsapp', 'facebook', 'instagram', 'telegram', 'x']);
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

export const managedContactKeySchema = z.enum([
  'contact_phone',
  'contact_email_primary',
  'contact_email_secondary',
  'contact_whatsapp',
]);
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
  imageUrl: httpsUrlSchema,
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
  imageUrl: httpsUrlSchema.nullable(),
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
export type ManagedContactKey = z.infer<typeof managedContactKeySchema>;
export type ManagedContactUpsertInput = z.infer<typeof managedContactUpsertSchema>;
export type UniversityPublic = z.infer<typeof universityPublicSchema>;
export type UniversityAdmin = z.infer<typeof universityAdminSchema>;
export type TestimonialPublic = z.infer<typeof testimonialPublicSchema>;
export type SocialLinkPublic = z.infer<typeof socialLinkPublicSchema>;
export type ManagedContact = z.infer<typeof managedContactSchema>;

export const orderStatusTransitionSchema = z.object({
  to: orderStatusSchema,
  clientVisibleMessage: z.string().trim().max(2000).optional(),
});

export const orderAssignmentSchema = z.object({
  assignedAdminId: z.string().trim().min(1).nullable(),
});

export const orderInternalNoteSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});

const emailSchema = z.string().trim().toLowerCase().email();
const passwordSchema = z.string().min(8).max(128);

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: emailSchema,
  password: passwordSchema,
  consentAccepted: z.literal(true),
});
export const verifyEmailSchema = z.object({
  email: emailSchema,
  code: z.string().regex(/^\d{6}$/),
});
export const loginSchema = z.object({ email: emailSchema, password: passwordSchema });
export const forgotPasswordSchema = z.object({ email: emailSchema });
export const resetPasswordSchema = z.object({
  email: emailSchema,
  code: z.string().regex(/^\d{6}$/),
  newPassword: passwordSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ClientOrderListQuery = z.infer<typeof clientOrderListQuerySchema>;
export type Specialization = z.infer<typeof specializationSchema>;
export type OrderStatusValue = z.infer<typeof orderStatusSchema>;
export type AdminOrderListQuery = z.infer<typeof adminOrderListQuerySchema>;
export type OrderStatusTransitionInput = z.infer<typeof orderStatusTransitionSchema>;
