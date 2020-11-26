import { HahowAPI, AuthParam, AuthRes } from '../datasources';

export interface IAuthModel {
  checkAuth(authParma: AuthParam): Promise<AuthRes>;
}

export class AuthModel implements IAuthModel {
  store: HahowAPI

  constructor({ store }: { store: HahowAPI }) {
    this.store = store;
  }

  async checkAuth(authParam: AuthParam): Promise<AuthRes> {
    return this.store.auth(authParam);
  }
}

export default AuthModel;
