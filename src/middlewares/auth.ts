import { IMiddleware } from 'koa-router';
import { IAuthService } from '../services';

interface Headers {
  name?: string;
  password?: string
}

export const auth = (
  authService: IAuthService,
): IMiddleware => async (ctx, next) => {
  const { headers: { name, password } }: { headers: Headers } = ctx;

  if (!name && !password) {
    ctx.state.isAuth = false;
    next();
    return;
  }
  if (!name || !password) throw new Error('No name or pwd');

  ctx.state.isAuth = await authService.auth({ name, password });

  next();
};

export default auth;
