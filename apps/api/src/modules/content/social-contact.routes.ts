import { Router } from 'express';
import {
  managedContactUpsertSchema,
  managedContentListQuerySchema,
  socialLinkCreateSchema,
  socialLinkUpdateSchema,
} from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { appErrors } from '../../core/app-error.js';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';
import { SocialContactService } from './social-contact.service.js';

const service = new SocialContactService(prisma);
export const publicSocialRouter = Router();
export const adminSocialRouter = Router();
export const publicContactRouter = Router();
export const adminContactRouter = Router();
function pathParam(value: string | string[] | undefined) {
  if (typeof value !== 'string') throw appErrors.notFound();
  return value;
}

publicSocialRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listPublicSocial() });
  } catch (error) {
    next(error);
  }
});
publicContactRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listPublicContact() });
  } catch (error) {
    next(error);
  }
});

adminSocialRouter.use(requireAuth, requireAdmin);
adminSocialRouter.get('/', async (request, response, next) => {
  try {
    response.json(
      await service.listAdminSocial(managedContentListQuerySchema.parse(request.query)),
    );
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
        item: await service.createSocial(
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
        item: await service.updateSocial(
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
adminSocialRouter.post(
  '/:socialLinkId/archive',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      await service.archiveSocial(
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
adminSocialRouter.post(
  '/:socialLinkId/restore',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      await service.restoreSocial(
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

adminContactRouter.use(requireAuth, requireAdmin);
adminContactRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listAdminContact() });
  } catch (error) {
    next(error);
  }
});
adminContactRouter.put(
  '/:key',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.json({
        item: await service.upsertContact(
          managedContactUpsertSchema.parse({
            key: pathParam(request.params.key),
            value: request.body.value,
          }),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
