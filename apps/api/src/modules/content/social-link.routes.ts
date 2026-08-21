import { Router } from 'express';
import {
  managedContentListQuerySchema,
  socialLinkCreateSchema,
  socialLinkUpdateSchema,
} from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';
import { pathParam } from './shared.js';
import { SocialLinkService } from './social-link.service.js';
const service = new SocialLinkService(prisma);
export const publicSocialRouter = Router();
export const adminSocialRouter = Router();
publicSocialRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listPublic() });
  } catch (error) {
    next(error);
  }
});
adminSocialRouter.use(requireAuth, requireAdmin);
adminSocialRouter.get('/', async (request, response, next) => {
  try {
    response.json(await service.listAdmin(managedContentListQuerySchema.parse(request.query)));
  } catch (error) {
    next(error);
  }
});
adminSocialRouter.post(
  '/',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.status(201).json({
        item: await service.create(
          socialLinkCreateSchema.parse(request.body),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
adminSocialRouter.patch(
  '/:socialLinkId',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.json({
        item: await service.update(
          pathParam(request.params.socialLinkId),
          socialLinkUpdateSchema.parse(request.body),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
for (const action of ['archive', 'restore'] as const)
  adminSocialRouter.post(
    `/:socialLinkId/${action}`,
    sensitiveRouteLimit(60),
    requireCsrf,
    async (request, response, next) => {
      try {
        await service[action](
          pathParam(request.params.socialLinkId),
          response.locals.user!.id,
          request.ip,
        );
        response.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  );
