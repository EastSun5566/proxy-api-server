import { AxiosError } from 'axios';
import { HahowAPI, AuthParam } from '../datasources';

export interface IAuthModel {
  checkAuth(param: AuthParam): Promise<boolean>;
}

export class AuthModel implements IAuthModel {
  store: HahowAPI

  constructor({ store }: { store: HahowAPI }) {
    this.store = store;
  }

  async checkAuth(param: AuthParam): Promise<boolean> {
    try {
      const { status } = await this.store.auth(param);

      if (status === 200) return true;
      return false;
    } catch (err) {
      if (err.isAxiosError) {
        if ((err as AxiosError).response?.status === 401) return false;
      }
      throw err;
    }
  }
}

export default AuthModel;
