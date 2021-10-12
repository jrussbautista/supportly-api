import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';

import { prisma } from './prisma';

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { userId } = token;
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        });

        if (!user) return done(null, false, 'User not found');
        //Pass the user details to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { firstName, lastName } = req.body;

        let user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (user) {
          return done(null, false, { message: 'Email is already taken' });
        }

        const hashPassword = bcrypt.hashSync(password, 8);

        user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: 'USER',
          },
        });

        const { password: userPassword, ...rest } = user;

        return done(null, rest);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: 'Email or Password is incorrect',
          });
        }

        const isPasswordMatch = bcrypt.compareSync(
          password,
          user.password || ''
        );
        if (!isPasswordMatch) {
          return done(null, false, {
            message: 'Email or password is incorrect',
          });
        }

        const { password: userPassword, ...rest } = user;

        return done(null, rest);
      } catch (error) {
        return done(error);
      }
    }
  )
);
