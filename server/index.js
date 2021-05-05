// @ts-check

import Pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
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
  const app = fastify({ logger: { prettyPrint: true } });

  setUpViews(app);
  setUpStaticAssets(app);

  addRoutes(app, options.state || {});

  return app;
};
