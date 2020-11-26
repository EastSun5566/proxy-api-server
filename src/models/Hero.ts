import { AxiosError } from 'axios';
import { HahowAPI, GetHeroParam } from '../datasources';
import { Hero } from '../domains';
import { NotFoundError } from '../utils/errors';

export interface IHeroModel {
  find(): Promise<Hero[]>;
  findById(id: GetHeroParam['heroId']): Promise<Hero>;
  findProfileById(id: GetHeroParam['heroId']): Promise<Hero['profile']>;
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
    try {
      const { data } = await this.store.getHero({ heroId: id });

      return data;
    } catch (err) {
      if (err.isAxiosError) {
        if ((err as AxiosError).response?.status === 404) throw new NotFoundError();
      }
      throw err;
    }
  }

  async findProfileById(id: GetHeroParam['heroId']): Promise<Hero['profile']> {
    try {
      const { data } = await this.store.getHeroProfile({ heroId: id });

      return data;
    } catch (err) {
      if (err.isAxiosError) {
        if ((err as AxiosError).response?.status === 404) throw new NotFoundError();
      }
      throw err;
    }
  }
}

export default HeroModel;
