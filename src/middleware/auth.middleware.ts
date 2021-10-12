import { Response, Request, NextFunction } from 'express';
import passport from 'passport';
import { UnauthorizedError } from '../utils/custom-error';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'jwt',
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(info);
      }
      if (!user) {
        throw new UnauthorizedError('Not Authorized');
      }

      user.password = undefined;
      req.user = user;

      return next();
    }
  )(req, res, next);
};
