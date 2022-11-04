import { NextFunction, Request, Response } from 'express';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { sign } from 'jsonwebtoken';
import { database } from './database';
import { USERS } from './root/collections';
import passport from 'passport';
import { UnauthorizedError } from './utils';
import { Role, User } from './types';

const tokenSecretOrKey = process.env.JWT_SECRET_OR_KEY;

export const generateJwt = (user: User) => {
  if (!tokenSecretOrKey) {
    throw new Error('JWT_SECRET_OR_KEY is not defined in the environment');
  }
  const { password, ...rest } = user;
  const token = sign({ user: rest }, tokenSecretOrKey, { expiresIn: '7 days' });
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: tokenSecretOrKey,
};
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const collection = database.collection<User>(USERS);
      const user = await collection.findOne({ id: payload.sub });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

const auth = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (a, user: User | false) => {
    if (user !== false && roles.includes(user.role)) {
      next();
    } else {
      next(new UnauthorizedError('Request not authorized'));
    }
  })(req, res, next);

export default auth;
