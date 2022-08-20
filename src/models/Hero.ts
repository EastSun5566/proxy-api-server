import { AxiosError } from 'axios';
import { HahowAPI, GetHeroParam } from '../datasources';
import { Hero, HeroProfile } from '../entities';
import { NotFoundError } from '../utils/errors';

export class HeroModel implements Hero {
  id: string;

  name: string;

  image: string;

  profile?: HeroProfile;

  constructor({
    id,
    name,
    image,
    profile,
  }: Hero) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.profile = profile;
  }

  static store = new HahowAPI();

  static async find(): Promise<HeroModel[]> {
    const { data: heroes } = await HeroModel.store.listHeroes();

    return heroes.map((hero) => new HeroModel(hero));
  }

  static async findById(id: GetHeroParam['heroId']): Promise<HeroModel> {
    try {
      const { data: hero } = await HeroModel.store.getHero({ heroId: id });

      return new HeroModel(hero);
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) throw new NotFoundError();

      throw err;
    }
  }

  async findProfile(): Promise<HeroModel> {
    try {
      const { data: profile } = await HeroModel.store.getHeroProfile({ heroId: this.id });

      this.profile = profile;
      return this;
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) throw new NotFoundError();

      throw err;
    }
  }
}

export default HeroModel;
