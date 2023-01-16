import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { database } from '../database';
import { USERS } from './collections';
import { generateJwt } from '../auth';
import { BadRequestError, UnauthorizedError } from '../utils';
import { User } from '../../types/root';
import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';

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

usersRouter.route('/users/session').get(async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError('This session has no token');
    }
    const currentToken = authorization.replace('Bearer ', '');
    const { user, exp, iat } = jwtDecode<{ user: User; exp: number; iat: number }>(currentToken);
    const now = DateTime.now();
    if (now.valueOf() > exp * 1000) {
      throw new UnauthorizedError('This session has expired');
    }
    if (now > DateTime.fromMillis(iat * 1000).plus({ hours: 24 })) {
      const newToken = generateJwt(user);
      return res.status(200).json({ token: newToken });
    }
    return res.status(200).json({ token: currentToken });
  } catch (error) {
    next(error);
  }
});

// TODO: add tests
usersRouter.route('/users/register').post(async (req, res, next) => {
  try {
    const { username, password, roles, psStoreHash } = req.body as User;
    const collection = database.collection<User>(USERS);

    if (roles.includes('portfolio_admin')) {
      const cursor = await collection.find({ roles: 'portfolio_admin' });
      const adminUsers = await cursor.toArray();
      if (adminUsers.length > 0) {
        throw new BadRequestError('Cannot create another admin user');
      }
    }

    const user = await collection.findOne({ username });
    if (user) {
      throw new BadRequestError(`User "${username}" already exists`);
    }

    if (roles.includes('playstation_user') && !psStoreHash) {
      throw new BadRequestError("'psStoreHash' is required for 'playstation_user' role");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await collection.insertOne({ username, password: hashPassword, roles, psStoreHash });
    return res.status(200).json('User created!');
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
