import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { database } from '../database';
import { PORTFOLIO_USERS } from './collections';
import { generateJwt } from './auth';

type User = {
  _id?: string;
  username: string;
  password: string;
};

const usersRouter = Router();

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
