import { Router } from 'express';
import {
  managedContentListQuerySchema,
  testimonialCreateSchema,
  testimonialUpdateSchema,
} from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { appErrors } from '../../core/app-error.js';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';
import { TestimonialsService } from './testimonials.service.js';

const service = new TestimonialsService(prisma);
export const publicTestimonialsRouter = Router();
export const adminTestimonialsRouter = Router();
function pathParam(value: string | string[] | undefined) {
  if (typeof value !== 'string') throw appErrors.notFound();
  return value;
}
publicTestimonialsRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listPublic() });
  } catch (error) {
    next(error);
  }
});
adminTestimonialsRouter.use(requireAuth, requireAdmin);
adminTestimonialsRouter.get('/', async (request, response, next) => {
  try {
    response.json(await service.listAdmin(managedContentListQuerySchema.parse(request.query)));
  } catch (error) {
    next(error);
  }
});
adminTestimonialsRouter.get('/:testimonialId', async (request, response, next) => {
  try {
    response.json({
      testimonial: await service.findAdmin(pathParam(request.params.testimonialId)),
    });
  } catch (error) {
    next(error);
  }
});
adminTestimonialsRouter.post(
  '/',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.status(201).json({
        testimonial: await service.create(
          testimonialCreateSchema.parse(request.body),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
adminTestimonialsRouter.patch(
  '/:testimonialId',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.json({
        testimonial: await service.update(
          pathParam(request.params.testimonialId),
          testimonialUpdateSchema.parse(request.body),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
adminTestimonialsRouter.post(
  '/:testimonialId/archive',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      await service.archive(
        pathParam(request.params.testimonialId),
        response.locals.user!.id,
        request.ip,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);
