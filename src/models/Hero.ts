import { AxiosError } from 'axios';
import { HahowAPI, GetHeroParam } from '../datasources';
import { Hero, HeroProfile } from '../domains';
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
    const { data } = await HeroModel.store.listHeroes();

    return data.map((heroData) => new HeroModel(heroData));
  }

  static async findById(id: GetHeroParam['heroId']): Promise<HeroModel> {
    try {
      const { data } = await HeroModel.store.getHero({ heroId: id });

      return new HeroModel(data);
    } catch (err) {
      if (err.isAxiosError) {
        if ((err as AxiosError).response?.status === 404) throw new NotFoundError();
      }
      throw err;
    }
  }

  async findProfile(): Promise<HeroModel> {
    try {
      const { data } = await HeroModel.store.getHeroProfile({ heroId: this.id });

      this.profile = data;
      return this;
    } catch (err) {
      if (err.isAxiosError) {
        if ((err as AxiosError).response?.status === 404) throw new NotFoundError();
      }
      throw err;
    }
  }
}

export default HeroModel;
