import axios, { AxiosError } from 'axios';
import { config } from '../config';

export interface AuthParam {
  name: string;
  password: string
}

export type AuthRes = boolean;

export class HahowAPI {
  request = axios.create({ baseURL: config.hahowAPIBaseURL });

  async auth(authParam: AuthParam): Promise<AuthRes> {
    try {
      const res = await this.request({
        url: '/auth',
        method: 'post',
        data: authParam,
      });

      if (res.status === 200) return true;
      return false;
    } catch (err) {
      if (err.isAxiosError) {
        if ((err as AxiosError).response?.status === 401) return false;
      }
      throw err;
    }
  }
}
