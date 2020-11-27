import { AxiosError } from 'axios';

import { IAuthModel } from '../models';
import { AuthParam } from '../datasources';

export interface IAuthService {
  checkAuth(param: AuthParam): Promise<boolean>;

}

export class AuthService implements IAuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private models: { auth: IAuthModel },
  ) {}

  async checkAuth(param: AuthParam): Promise<boolean> {
    try {
      const { status } = await this.models.auth.auth(param);

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

export default AuthService;
