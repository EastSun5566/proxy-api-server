import { Server } from 'http';

import Koa from 'koa';
import Router, { IRouterOptions } from 'koa-router';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';

import { createRouter } from './router';
import { errorHandler, auth } from './middlewares';

import { AuthService } from './services';
import { AuthModel } from './models';
import { HahowAPI } from './datasources';

interface ServerOptions extends IRouterOptions {
  port?: number;
}

export const createServer = (options: ServerOptions = {}): Server => {
  const router = createRouter(new Router(options));

  const port = options.port || process.env.PORT || 8080;

  const server = new Koa()
    .use(helmet())
    .use(bodyParser())
    .use(errorHandler())
    .use(auth(new AuthService({ auth: new AuthModel({ store: new HahowAPI() }) })))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);

  console.info(`[HTTP] listening on http://localhost:${port}${options.prefix || ''}`);

  return server;
};
export default createServer;
