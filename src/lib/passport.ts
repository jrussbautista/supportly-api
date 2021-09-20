import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/User';

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { user_id } = token;
        const user = await User.findOne(user_id);
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

        let user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
          return done(null, false, { message: 'Email is already taken' });
        }

        user = new User();

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        user.hashPassword();

        await user.save();
        //Send the user information to the next middleware
        return done(null, user);
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
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: 'Email or Password is incorrect',
          });
        }

        const isPasswordMatch = user.checkPassword(password);
        if (!isPasswordMatch) {
          return done(null, false, {
            message: 'Email or password is incorrect',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
