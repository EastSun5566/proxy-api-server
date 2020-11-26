import { IAuthModel } from '../models';
import { AuthParam } from '../datasources';

export interface IAuthService {
  auth(param: AuthParam): Promise<boolean>;

}

export class AuthService implements IAuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private models: { auth: IAuthModel },
  ) {}

  auth(param: AuthParam): Promise<boolean> {
    return this.models.auth.checkAuth(param);
  }
}

export default AuthService;
