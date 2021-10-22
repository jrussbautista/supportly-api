import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { createToken } from '../../lib/jwt';
import {
  UnauthorizedError,
  DuplicateFieldError,
} from '../../utils/custom-error';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'signup',
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        if ((info.message = 'Email is already taken')) {
          throw new DuplicateFieldError(info.message);
        }
        throw new UnauthorizedError(info.message);
      }

      const token = createToken(user.id);
      res.status(200).json({ user, token });
    }
  )(req, res, next);
};
