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

export const createOrderSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phoneNumber: z.string().trim().min(7).max(32),
  specialization: specializationSchema,
});

export const orderResponseSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type Specialization = z.infer<typeof specializationSchema>;
