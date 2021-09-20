import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../entities';
import { createToken } from '../lib/jwt';
import { UnauthorizedError, DuplicateFieldError } from '../utils/custom-error';
import catchErrors from '../utils/catch-errors';

const sendResponse = (user: User, res: Response) => {
  user.password = undefined;
  const token = createToken(user.id);
  res.status(200).json({ user, token });
};

export const login = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'login',
      { session: false },
      function (err, user, info) {
        if (err) {
          console.log(err);
          return next(err);
        }

        if (!user) {
          throw new UnauthorizedError(info.message);
        }

        sendResponse(user, res);
      }
    )(req, res, next);
  }
);

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

      sendResponse(user, res);
    }
  )(req, res, next);
};
