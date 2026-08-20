import { Router } from 'express';
import { managedContactUpsertSchema } from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';
import { pathParam } from './shared.js';
import { ManagedContactService } from './managed-contact.service.js';
const service = new ManagedContactService(prisma);
export const publicContactRouter = Router();
export const adminContactRouter = Router();
publicContactRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listPublic() });
  } catch (error) {
    next(error);
  }
});
adminContactRouter.use(requireAuth, requireAdmin);
adminContactRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await service.listAdmin() });
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
        item: await service.upsert(
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
