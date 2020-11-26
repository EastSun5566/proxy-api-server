/* eslint-disable class-methods-use-this */
import { IMiddleware } from 'koa-router';
import { IHeroService } from '../services';

interface getHeroDTO {
  heroId: number
}

interface IHeroController {
  list: IMiddleware;
  get: IMiddleware;
}

export class HeroController implements IHeroController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly HeroService: IHeroService,
  ) {}

  list: IMiddleware = async (ctx) => {
    // ctx.body = await this.HeroService.find();
  }

  get: IMiddleware = async (ctx) => {
    const { params }: { params: getHeroDTO } = ctx;

    ctx.body = await this.HeroService.findById(params.heroId);
  }
}

export default HeroController;
