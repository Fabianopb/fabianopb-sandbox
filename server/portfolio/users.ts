import { Router } from 'express';
import { database } from '../database';
import { PORTFOLIO_USERS } from './collections';
import bcrypt from 'bcryptjs';

type User = {
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
      return response.status(403);
    }
    return response.status(200).json('Return token');
  } catch (error) {
    return response.status(400).send(error);
  }
});

usersRouter.route('/users/register-admin').post(async (request, response) => {
  try {
    const collection = database.collection<User>(PORTFOLIO_USERS);
    const existingDocuments = await collection.countDocuments();
    if (existingDocuments > 0) {
      throw new Error('Admin user already registered');
    }
    const { username, password } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await collection.insertOne({ username, password: hashPassword });
    return response.status(200).json('Admin user created!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default usersRouter;
