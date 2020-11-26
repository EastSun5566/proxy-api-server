/* eslint-disable class-methods-use-this */
import { IMiddleware } from 'koa-router';
import { State } from '../interfaces';
import { IHeroService } from '../services';

interface GetHeroDTO {
  heroId: number
}

interface IHeroController {
  list: IMiddleware<State>;
  get: IMiddleware<State>;
}

export class HeroController implements IHeroController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly HeroService: IHeroService,
  ) {}

  list: IMiddleware<State> = async (ctx) => {
    const { isAuth } = ctx.state;

    ctx.body = {
      heroes: await this.HeroService.find({ isAuth }),
    };
  }

  get: IMiddleware<State> = async (ctx) => {
    const { state, params } = ctx;

    ctx.body = await this.HeroService.findById({
      isAuth: state.isAuth,
      heroId: (params as GetHeroDTO).heroId,
    });
  }
}

export default HeroController;
