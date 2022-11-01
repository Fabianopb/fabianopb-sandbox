import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { database } from '../database';
import { PORTFOLIO_USERS } from './collections';
import { generateJwt } from '../auth';
import { BadRequestError, UnauthorizedError } from '../utils';
import { User } from '../types';

const usersRouter = Router();

usersRouter.route('/users/login').post(async (req, res, next) => {
  try {
    const collection = database.collection<User>(PORTFOLIO_USERS);
    const { username, password } = req.body;
    const user = await collection.findOne({ username });
    const isValidUser = user && bcrypt.compareSync(password, user.password);
    if (!isValidUser) {
      throw new UnauthorizedError('Invalid username or password provided');
    }
    const token = generateJwt(user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

usersRouter.route('/users/register-admin').post(async (req, res, next) => {
  try {
    const collection = database.collection<User>(PORTFOLIO_USERS);
    const existingDocuments = await collection.countDocuments();
    if (existingDocuments > 0) {
      throw new BadRequestError('Admin user already exists');
    }
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await collection.insertOne({ username, password: hashPassword, role: 'portfolio_admin' });
    return res.status(200).json('Admin user created!');
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
