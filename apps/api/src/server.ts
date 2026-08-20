import { app } from './app.js';
import { env } from './config/env.js';
import { initializeMonitoring } from './core/monitoring.js';

initializeMonitoring();
app.listen(env.API_PORT, '0.0.0.0', () => {
  console.log(`API listening on port ${env.API_PORT}`);
});
