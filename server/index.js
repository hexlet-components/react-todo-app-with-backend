// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static';
import pointOfView from '@fastify/view';
import fastify from 'fastify';
import Pug from 'pug';
import addRoutes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV === 'development';
const appPath = path.join(__dirname, '..');

const setUpViews = (app) => {
  const devHost = 'http://localhost:8080';
  const domain = isDevelopment ? devHost : '';
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets/',
  });
};

export default (options) => {
  const app = fastify({ logger: { transport: { target: 'pino-pretty' } } });

  setUpViews(app);
  setUpStaticAssets(app);

  addRoutes(app, options.state || {});

  return app;
};
