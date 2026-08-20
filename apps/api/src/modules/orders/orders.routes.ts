import { Router } from 'express';
import {
  clientOrderListQuerySchema,
  createOrderSchema,
  orderResponseSchema,
} from '@abou/contracts';
import { prisma } from '../../lib/prisma.js';
import { requireAuth, requireCsrf } from '../../middleware/auth.js';
import { OrdersService } from './orders.service.js';
import { appErrors } from '../../core/app-error.js';
import { createEmailProvider } from '../auth/email.provider.js';
import { createOrderNotifier } from './notifier.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';

const ordersService = new OrdersService(prisma);
const orderNotifier = createOrderNotifier(createEmailProvider());
export const ordersRouter = Router();

ordersRouter.use(requireAuth);

ordersRouter.get('/', async (request, response, next) => {
  try {
    response.json(
      await ordersService.listForClient(
        response.locals.user!.id,
        clientOrderListQuerySchema.parse(request.query),
      ),
    );
  } catch (error) {
    next(error);
  }
});

ordersRouter.post('/', sensitiveRouteLimit(10), requireCsrf, async (request, response, next) => {
  try {
    const order = await ordersService.create(
      response.locals.user!,
      createOrderSchema.parse(request.body),
      request.ip,
    );
    await orderNotifier.notifySubmitted({ recipient: order.email, reference: order.reference });
    response.status(201).json({ order });
  } catch (error) {
    next(error);
  }
});

ordersRouter.get('/:orderId', async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    if (typeof orderId !== 'string') throw appErrors.notFound();
    response.json({ order: await ordersService.findOwned(orderId, response.locals.user!.id) });
  } catch (error) {
    next(error);
  }
});

ordersRouter.post('/:orderId/cancel', sensitiveRouteLimit(20), requireCsrf, async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    if (typeof orderId !== 'string') throw appErrors.notFound();
    await ordersService.cancel(orderId, response.locals.user!.id, request.ip);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

ordersRouter.post('/:orderId/responses', sensitiveRouteLimit(30), requireCsrf, async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    if (typeof orderId !== 'string') throw appErrors.notFound();
    const createdResponse = await ordersService.addResponse(
      orderId,
      response.locals.user!.id,
      orderResponseSchema.parse(request.body).body,
      request.ip,
    );
    response.status(201).json({ response: createdResponse });
  } catch (error) {
    next(error);
  }
});
