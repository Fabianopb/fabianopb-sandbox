import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { database } from '../database';
import { USERS } from './collections';
import { generateJwt } from '../auth';
import { BadRequestError, UnauthorizedError } from '../utils';
import { User } from '../types';

const usersRouter = Router();

usersRouter.route('/users/login').post(async (req, res, next) => {
  try {
    const collection = database.collection<User>(USERS);
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

usersRouter.route('/users/register').post(async (req, res, next) => {
  try {
    const { username, password, role, psStoreHash } = req.body as User;
    const collection = database.collection<User>(USERS);

    if (role === 'portfolio_admin') {
      const cursor = await collection.find({ role });
      const adminUsers = await cursor.toArray();
      if (adminUsers.length > 0) {
        throw new BadRequestError('Cannot create another admin user');
      }
    }

    const user = await collection.findOne({ username });
    if (user) {
      throw new BadRequestError(`User "${username}" already exists`);
    }

    if (role === 'playstation_user' && !psStoreHash) {
      throw new BadRequestError("'psStoreHash' is required for 'playstation_user' role");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await collection.insertOne({ username, password: hashPassword, role, psStoreHash });
    return res.status(200).json('User created!');
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
