import { IAuthModel } from '../models';
import { AuthParam, AuthRes } from '../datasources';

export interface IAuthService {
  auth({ name, password }: AuthParam): Promise<AuthRes>;

}

export class AuthService implements IAuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private models: { auth: IAuthModel },
  ) {}

  auth(authInfo: AuthParam): Promise<AuthRes> {
    return this.models.auth.checkAuth(authInfo);
  }
}

export default AuthService;
