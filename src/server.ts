import { Server } from 'http';

import Koa from 'koa';
import Router, { IRouterOptions } from 'koa-router';

import { createRouter } from './router';
import { errorHandler, auth } from './middlewares';

import { AuthService } from './services';
import { HahowAPI } from './datasources';

interface ServerOptions extends IRouterOptions {
  port?: number;
}

export const createServer = (options: ServerOptions = {}): Server => {
  const router = createRouter(new Router(options));

  const port = options.port || process.env.PORT || 8080;

  const server = new Koa()
    .use(errorHandler())
    .use(auth(new AuthService({ auth: new HahowAPI() })))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);

  // eslint-disable-next-line no-console
  console.info(`[HTTP] listening on http://localhost:${port}${options.prefix || ''}`);

  return server;
};
export default createServer;
