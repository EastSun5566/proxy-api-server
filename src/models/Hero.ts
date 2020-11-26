import { HahowAPI, GetHeroParam } from '../datasources';
import { Hero } from '../domains';

export interface IHeroModel {
  findById(id: GetHeroParam['heroId']): Promise<Hero>
}

export class HeroModel implements IHeroModel {
  store: HahowAPI

  constructor({ store }: { store: HahowAPI }) {
    this.store = store;
  }

  async findById(id: GetHeroParam['heroId']): Promise<Hero> {
    const { data } = await this.store.getHero({ heroId: id });

    return data;
  }
}

export default HeroModel;
