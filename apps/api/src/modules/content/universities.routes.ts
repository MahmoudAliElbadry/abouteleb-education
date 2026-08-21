import { Router } from 'express';
import {
  managedContentListQuerySchema,
  universityCreateSchema,
  universityUpdateSchema,
} from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';
import { UniversitiesService } from './universities.service.js';
import { pathParam } from './shared.js';

const service = new UniversitiesService(prisma);
export const publicUniversitiesRouter = Router();
export const adminUniversitiesRouter = Router();

publicUniversitiesRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listPublic() });
  } catch (error) {
    next(error);
  }
});
publicUniversitiesRouter.get('/:slug', async (request, response, next) => {
  try {
    response.json({ university: await service.findPublic(pathParam(request.params.slug)) });
  } catch (error) {
    next(error);
  }
});

adminUniversitiesRouter.use(requireAuth, requireAdmin);
adminUniversitiesRouter.get('/', async (request, response, next) => {
  try {
    response.json(await service.listAdmin(managedContentListQuerySchema.parse(request.query)));
  } catch (error) {
    next(error);
  }
});
adminUniversitiesRouter.get('/:universityId', async (request, response, next) => {
  try {
    response.json({ university: await service.findAdmin(pathParam(request.params.universityId)) });
  } catch (error) {
    next(error);
  }
});
adminUniversitiesRouter.post(
  '/',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.status(201).json({
        university: await service.create(
          universityCreateSchema.parse(request.body),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
adminUniversitiesRouter.patch(
  '/:universityId',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      response.json({
        university: await service.update(
          pathParam(request.params.universityId),
          universityUpdateSchema.parse(request.body),
          response.locals.user!.id,
          request.ip,
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);
adminUniversitiesRouter.post(
  '/:universityId/archive',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      await service.archive(
        pathParam(request.params.universityId),
        response.locals.user!.id,
        request.ip,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);
adminUniversitiesRouter.post(
  '/:universityId/restore',
  sensitiveRouteLimit(60),
  requireCsrf,
  async (request, response, next) => {
    try {
      await service.restore(
        pathParam(request.params.universityId),
        response.locals.user!.id,
        request.ip,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);
