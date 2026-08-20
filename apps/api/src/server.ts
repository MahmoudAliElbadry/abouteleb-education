import { app } from './app.js';
import { env } from './config/env.js';

app.listen(env.API_PORT, '0.0.0.0', () => {
  console.log(`API listening on port ${env.API_PORT}`);
});
