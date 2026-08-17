import cors from 'cors';
import compression from 'compression';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import { healthResponseSchema } from '@abou/contracts';
import { env } from './config/env.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '100kb' }));

app.get('/api/v1/health', (_request, response) => {
  response.json(healthResponseSchema.parse({ status: 'ok', service: 'api' }));
});

app.get('/api/v1/health/readiness', (_request, response) => {
  response.json({ status: 'ok', service: 'api', checks: { database: 'not-configured' } });
});

app.use((_request, response) => {
  response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;
  console.error(error);
  response
    .status(500)
    .json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
};

app.use(errorHandler);
