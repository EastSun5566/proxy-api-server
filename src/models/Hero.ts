import { HahowAPI, GetHeroParam } from '../datasources';
import { Hero } from '../domains';

export interface IHeroModel {
  find(): Promise<Hero[]>;
  findById(id: GetHeroParam['heroId']): Promise<Hero>;
}

export class HeroModel implements IHeroModel {
  store: HahowAPI

  constructor({ store }: { store: HahowAPI }) {
    this.store = store;
  }

  async find(): Promise<Hero[]> {
    const { data } = await this.store.listHeroes();

    return data;
  }

  async findById(id: GetHeroParam['heroId']): Promise<Hero> {
    const { data } = await this.store.getHero({ heroId: id });

    return data;
  }
}

export default HeroModel;
