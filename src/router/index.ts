import Router from 'koa-router';

import {
  HomeController,
  HeroController,
} from '../controllers';
import {
  HomeService,
} from '../services';
import { registerRoute, Route } from './utils';

export const createRouter = (router: Router): Router => {
  const homeController = new HomeController(new HomeService());
  const bookController = new HeroController();

  const routes: Route[] = [
    {
      path: '/',
      method: 'get',
      handler: homeController.get,
    },
    {
      path: '/heroes',
      method: 'get',
      handler: bookController.list,
      children: [
        {
          path: ':heroId',
          method: 'get',
          handler: bookController.get,
        },
      ],
    },
  ];

  routes.forEach((route) => registerRoute({ router, route }));

  return router;
};

export default createRouter;
