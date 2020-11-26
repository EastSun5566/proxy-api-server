import axios, { AxiosPromise } from 'axios';

import { config } from '../config';
import { Hero } from '../domains';

export interface AuthParam {
  name: string;
  password: string
}

export interface GetHeroParam {
  heroId: number;
}

export class HahowAPI {
  request = axios.create({ baseURL: config.hahowAPIBaseURL });

  auth(param: AuthParam): AxiosPromise<void> {
    return this.request({
      url: '/auth',
      method: 'post',
      data: param,
    });
  }

  listHeroes(): AxiosPromise<Hero[]> {
    return this.request({
      url: '/heroes',
    });
  }

  getHero({ heroId }: GetHeroParam): AxiosPromise<Hero> {
    return this.request({
      url: `/heroes/${heroId}`,
    });
  }

  getHeroProfile({ heroId }: GetHeroParam): AxiosPromise<Hero['profile']> {
    return this.request({
      url: `/heroes/${heroId}/profile`,
    });
  }
}
