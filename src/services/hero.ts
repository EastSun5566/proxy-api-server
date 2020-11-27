import { HeroModel } from '../models';
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
    private models: { Hero: typeof HeroModel },
  ) {}

  async find({ isAuth }: QueryParam): Promise<Hero[]> {
    const heroes = await this.models.Hero.find();

    if (!isAuth) return heroes;

    return Promise.all(
      heroes.map((hero) => hero.findProfile()),
    );
  }

  async findById({ isAuth, heroId }: QueryParam & GetHeroParam): Promise<Hero> {
    const hero = await this.models.Hero.findById(heroId);

    if (!isAuth) return hero;

    return hero.findProfile();
  }
}

export default HeroService;
