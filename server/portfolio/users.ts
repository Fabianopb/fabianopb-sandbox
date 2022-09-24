import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { database } from '../database';
import { PORTFOLIO_USERS } from './collections';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

type User = {
  username: string;
  password: string;
};

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const collection = database.collection<User>(PORTFOLIO_USERS);
      const user = await collection.findOne({ username });
      const isValidUser = user && bcrypt.compareSync(password, user.password);
      if (!isValidUser) {
        return cb(null, false, { message: 'Invalid username or password' });
      }
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);

const usersRouter = Router();

usersRouter.route('/users/login').post(passport.authenticate('local'));

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
