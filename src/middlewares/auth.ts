import { IMiddleware } from 'koa-router';
import { IAuthService } from '../services';
import { State } from '../interfaces';
import { UnauthenticatedError } from '../utils/errors';

interface Header {
  name?: string;
  password?: string
}

export const auth = (
  authService: IAuthService,
): IMiddleware<State> => async (ctx, next) => {
  const { header: { name, password } }: { header: Header } = ctx;

  if (!name && !password) {
    ctx.state.isAuth = false;
    await next();
    return;
  }
  if (!name || !password) throw new UnauthenticatedError();
  if (!await authService.checkAuth({ name, password })) throw new UnauthenticatedError();

  ctx.state.isAuth = true;
  await next();
};

export default auth;
