import cors from 'cors';
import compression from 'compression';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ZodError } from 'zod';
import { healthResponseSchema } from '@abou/contracts';
import { env } from './config/env.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { AppError, appErrors } from './core/app-error.js';
import { logger } from './core/logger.js';
import { requestContext } from './middleware/request-context.js';
import { ordersRouter } from './modules/orders/orders.routes.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(requestContext);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', ordersRouter);

app.get('/api/v1/health', (_request, response) => {
  response.json(healthResponseSchema.parse({ status: 'ok', service: 'api' }));
});

app.get('/api/v1/health/readiness', (_request, response) => {
  response.json({ status: 'ok', service: 'api', checks: { database: 'not-configured' } });
});

app.use((_request, response) => {
  const error = appErrors.notFound();
  response.status(error.status).json({
    error: { code: error.code, message: error.publicMessage, requestId: response.locals.requestId },
  });
});

const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  void _next;
  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        requestId: response.locals.requestId,
      },
    });
    return;
  }
  if (error instanceof AppError) {
    logger.warn('request.failed', {
      requestId: response.locals.requestId,
      method: request.method,
      path: request.path,
      code: error.code,
      metadata: error.metadata,
    });
    response.status(error.status).json({
      error: {
        code: error.code,
        message: error.publicMessage,
        requestId: response.locals.requestId,
      },
    });
    return;
  }
  logger.error('request.failed', {
    requestId: response.locals.requestId,
    method: request.method,
    path: request.path,
    errorName: error instanceof Error ? error.name : 'UnknownError',
  });
  response.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      requestId: response.locals.requestId,
    },
  });
};

app.use(errorHandler);
