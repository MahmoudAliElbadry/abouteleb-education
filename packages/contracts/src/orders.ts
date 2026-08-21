import { z } from 'zod';
export const healthResponseSchema = z.object({ status: z.literal('ok'), service: z.string() });
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
export const orderResponseSchema = z.object({ body: z.string().trim().min(1).max(2000) });
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
export const orderStatusTransitionSchema = z.object({
  to: orderStatusSchema,
  clientVisibleMessage: z.string().trim().max(2000).optional(),
});
export const orderAssignmentSchema = z.object({
  assignedAdminId: z.string().trim().min(1).nullable(),
});
export const orderInternalNoteSchema = z.object({ body: z.string().trim().min(1).max(2000) });
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ClientOrderListQuery = z.infer<typeof clientOrderListQuerySchema>;
export type Specialization = z.infer<typeof specializationSchema>;
export type OrderStatusValue = z.infer<typeof orderStatusSchema>;
export type AdminOrderListQuery = z.infer<typeof adminOrderListQuerySchema>;
export type OrderStatusTransitionInput = z.infer<typeof orderStatusTransitionSchema>;
