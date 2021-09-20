import { Response, Request, NextFunction } from 'express';
import passport from 'passport';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'jwt',
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(info);
      }
      if (!user)
        return res.status(401).json({
          message: 'Not Authorized',
        });
      req.user = user;
      return next();
    }
  )(req, res, next);
};
