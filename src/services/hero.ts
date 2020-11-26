import { IHeroModel } from '../models';
import { GetHeroParam } from '../datasources';
import { Hero } from '../domains';

export interface IHeroService {
  findById(id: GetHeroParam['heroId']): Promise<Hero>;

}

export class HeroService implements IHeroService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private models: { hero: IHeroModel },
  ) {}

  findById(id: GetHeroParam['heroId']): Promise<Hero> {
    return this.models.hero.findById(id);
  }
}

export default HeroService;
