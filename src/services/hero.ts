import { IHeroModel } from '../models';
import { GetHeroParam } from '../datasources';
import { Hero } from '../domains';

export interface IHeroService {

  find(): Promise<Hero[]>;
  findById(id: GetHeroParam['heroId']): Promise<Hero>;

}

export class HeroService implements IHeroService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private models: { hero: IHeroModel },
  ) {}

  find(): Promise<Hero[]> {
    return this.models.hero.find();
  }

  findById(id: GetHeroParam['heroId']): Promise<Hero> {
    return this.models.hero.findById(id);
  }
}

export default HeroService;
