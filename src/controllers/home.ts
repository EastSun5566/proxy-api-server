import { IMiddleware } from 'koa-router';

interface IHomeController {
  get: IMiddleware;
}

export class HomeController implements IHomeController {
  get: IMiddleware = (ctx): void => {
    ctx.body = 'Welcome to Hero API server 🎉';
  }
}

export default HomeController;
