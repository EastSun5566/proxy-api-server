import { IHeroModel } from '../models';
import { GetHeroParam } from '../datasources';
import { Hero } from '../domains';

interface QueryParam {
  isAuth?: boolean
}

export interface IHeroService {

  find(param: QueryParam): Promise<Hero[]>;
  findById(param: QueryParam & GetHeroParam): Promise<Hero>;

}

export class HeroService implements IHeroService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private models: { hero: IHeroModel },
  ) {}

  async find({ isAuth }: QueryParam): Promise<Hero[]> {
    if (!isAuth) return this.models.hero.find();

    const heroes = await this.models.hero.find();
    const heroProfiles = await Promise.all(
      heroes.map(({ id }) => this.models.hero.findProfileById(id)),
    );

    return heroes.map((hero, index) => ({
      ...hero,
      profile: heroProfiles[index],
    }));
  }

  async findById({ isAuth, heroId }: QueryParam & GetHeroParam): Promise<Hero> {
    if (!isAuth) return this.models.hero.findById(heroId);

    const [hero, heroProfile] = await Promise.all([
      this.models.hero.findById(heroId),
      this.models.hero.findProfileById(heroId),
    ]);

    return {
      ...hero,
      profile: heroProfile,
    };
  }
}

export default HeroService;
