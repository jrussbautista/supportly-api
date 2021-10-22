import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { createToken } from '../../lib/jwt';
import { UnauthorizedError } from '../../utils/custom-error';
import catchErrors from '../../utils/catch-errors';

export const login = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'login',
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          throw new UnauthorizedError(info.message);
        }

        const token = createToken(user.id);
        res.status(200).json({ user, token });
      }
    )(req, res, next);
  }
);
