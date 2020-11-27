import { AxiosPromise } from 'axios';
import { HahowAPI, AuthParam } from '../datasources';

export interface IAuthModel {
  auth(param: AuthParam): AxiosPromise<void>;
}

export class AuthModel implements IAuthModel {
  store: HahowAPI

  constructor({ store }: { store: HahowAPI }) {
    this.store = store;
  }

  auth(param: AuthParam): AxiosPromise<void> {
    return this.store.auth(param);
  }
}

export default AuthModel;
