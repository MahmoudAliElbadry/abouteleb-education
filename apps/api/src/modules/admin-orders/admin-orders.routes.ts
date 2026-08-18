import { Router, type Request } from 'express';
import {
  adminOrderListQuerySchema,
  orderAssignmentSchema,
  orderInternalNoteSchema,
  orderStatusTransitionSchema,
} from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { appErrors } from '../../core/app-error.js';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { AdminOrdersService } from './admin-orders.service.js';

const adminOrdersService = new AdminOrdersService(prisma);
export const adminOrdersRouter = Router();

function orderIdFrom(request: Request) {
  const orderId = request.params.orderId;
  if (typeof orderId !== 'string') throw appErrors.notFound();
  return orderId;
}

adminOrdersRouter.use(requireAuth, requireAdmin);

adminOrdersRouter.get('/metrics', async (_request, response, next) => {
  try {
    response.json(await adminOrdersService.metrics());
  } catch (error) {
    next(error);
  }
});

adminOrdersRouter.get('/', async (request, response, next) => {
  try {
    response.json(await adminOrdersService.list(adminOrderListQuerySchema.parse(request.query)));
  } catch (error) {
    next(error);
  }
});

adminOrdersRouter.get('/:orderId', async (request, response, next) => {
  try {
    response.json({ order: await adminOrdersService.findById(orderIdFrom(request)) });
  } catch (error) {
    next(error);
  }
});

adminOrdersRouter.patch('/:orderId/assignment', requireCsrf, async (request, response, next) => {
  try {
    const result = await adminOrdersService.assign(
      orderIdFrom(request),
      orderAssignmentSchema.parse(request.body).assignedAdminId,
      response.locals.user!.id,
      request.ip,
    );
    response.json({ assignment: result });
  } catch (error) {
    next(error);
  }
});

adminOrdersRouter.post('/:orderId/status', requireCsrf, async (request, response, next) => {
  try {
    const result = await adminOrdersService.transition(
      orderIdFrom(request),
      orderStatusTransitionSchema.parse(request.body),
      response.locals.user!.id,
      request.ip,
    );
    response.json({ transition: result });
  } catch (error) {
    next(error);
  }
});

adminOrdersRouter.post('/:orderId/internal-notes', requireCsrf, async (request, response, next) => {
  try {
    const result = await adminOrdersService.addInternalNote(
      orderIdFrom(request),
      orderInternalNoteSchema.parse(request.body).body,
      response.locals.user!.id,
      request.ip,
    );
    response.status(201).json({ note: result });
  } catch (error) {
    next(error);
  }
});
