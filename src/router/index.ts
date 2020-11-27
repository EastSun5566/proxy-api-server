import Router from 'koa-router';

import {
  HomeController,
  HeroController,
} from '../controllers';
import { HeroService } from '../services';
import { HeroModel } from '../models';
import { registerRoute, Route } from './utils';

export const createRouter = (router: Router): Router => {
  const homeController = new HomeController();
  const bookController = new HeroController(new HeroService({ Hero: HeroModel }));

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
          path: '/:heroId',
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
