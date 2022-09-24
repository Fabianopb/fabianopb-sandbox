import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { database } from '../database';
import { PORTFOLIO_USERS } from './collections';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { sign } from 'jsonwebtoken';

const tokenSecretOrKey = process.env.JWT_SECRET_OR_KEY;

type User = {
  _id?: string;
  username: string;
  password: string;
};

const generateJwt = (user: User) => {
  if (!tokenSecretOrKey) {
    throw new Error('JWT_SECRET_OR_KEY is not defined in the environment');
  }

  const token = sign({ user }, tokenSecretOrKey, { expiresIn: '7 days' });
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: tokenSecretOrKey,
};
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const collection = database.collection<User>(PORTFOLIO_USERS);
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

const usersRouter = Router();

usersRouter.route('/users').get(passport.authenticate('jwt', { session: false }), async (_, response) => {
  const collection = database.collection(PORTFOLIO_USERS);
  const cursor = collection.find();
  const users = await cursor.toArray();
  return response.status(200).json(users);
});

usersRouter.route('/users/login').post(async (request, response) => {
  try {
    const collection = database.collection<User>(PORTFOLIO_USERS);
    const { username, password } = request.body;
    const user = await collection.findOne({ username });
    const isValidUser = user && bcrypt.compareSync(password, user.password);
    if (!isValidUser) {
      return response.status(403).send({ error: 'Invalid username or password' });
    }
    const token = generateJwt(user);
    return response.status(200).json({ token });
  } catch (error) {
    return response.status(400).send({ error });
  }
});

usersRouter.route('/users/register-admin').post(async (request, response) => {
  try {
    const collection = database.collection<User>(PORTFOLIO_USERS);
    const existingDocuments = await collection.countDocuments();
    if (existingDocuments > 0) {
      return response.status(400).send({ error: 'Admin user already exists!' });
    }
    const { username, password } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await collection.insertOne({ username, password: hashPassword });
    return response.status(200).json('Admin user created!');
  } catch (error) {
    return response.status(400).send({ error });
  }
});

export default usersRouter;
