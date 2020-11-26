/* eslint-disable class-methods-use-this */
import { RouterContext as Context } from 'koa-router';

import { Hero } from '../domains';
// import { IHeroService } from '../services';

interface getHeroDTO {
  id: number
}

interface IHeroController {
  list(ctx: Context): Promise<void>;
  get(ctx: Context): Promise<void>;
}

export class HeroController implements IHeroController {
  // eslint-disable-next-line no-useless-constructor
  // constructor(
  //   private readonly HeroService: IHeroService,
  // ) {}

  async list(ctx: Context): Promise<void> {
    // ctx.body = await this.HeroService.find();
  }

  async get(ctx: Context): Promise<void> {
    // const { params }: { params: getHeroDTO } = ctx;

    // ctx.body = await this.HeroService.findByID(params.id);
  }
}

export default HeroController;
