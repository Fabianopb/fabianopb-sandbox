import { Router } from 'express';
import { ObjectId } from 'mongodb';
import jwtDecode from 'jwt-decode';

import { database } from '../database';
import { BadRequestError, NotFoundError } from '../utils';
import auth from '../auth';
import { PLAYSTATION_WISHLIST } from './collections';
import { User } from '../../types/root';
import { agent, getPsStoreRequestParams } from './utils';

const authorize = auth('playstation_user');

const wishlistRouter = Router();

wishlistRouter.get('/wishlist', authorize, async (req, res, next) => {
  try {
    const { authorization } = req.headers as { authorization: string };
    const { user } = jwtDecode<{ user: User }>(authorization.replace('Bearer ', ''));
    const collection = database.collection(PLAYSTATION_WISHLIST);
    const cursor = collection.find({ userId: user._id });
    const wishlist = await cursor.toArray();
    return res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
});

wishlistRouter.post('/wishlist', authorize, async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const { authorization } = req.headers as { authorization: string };
    const { user } = jwtDecode<{ user: User }>(authorization.replace('Bearer ', ''));
    if (!user.psStoreHash) {
      throw new BadRequestError(`User ${user._id} has no psStoreHash`);
    }
    const requestParams = getPsStoreRequestParams(gameId, user.psStoreHash);
    const resource = await agent.get('', { params: requestParams });
    const collection = database.collection(PLAYSTATION_WISHLIST);
    const wishItem = { ...req.body, userId: user._id, data: resource.data.data, updatedAt: new Date().valueOf() };
    await collection.insertOne(wishItem);
    return res.status(200).json('Item created');
  } catch (error) {
    next(error);
  }
});

wishlistRouter.put('/wishlist/:wishItemId', authorize, async (req, res, next) => {
  try {
    const { wishItemId } = req.params;
    const wishItem = req.body;
    const replaceDocument = wishItem;
    const collection = database.collection(PLAYSTATION_WISHLIST);
    const result = await collection.replaceOne({ _id: new ObjectId(wishItemId) }, replaceDocument);
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Item '${wishItemId}' not found`);
    }
    return res.status(200).json({ message: 'Item updated' });
  } catch (error) {
    next(error);
  }
});

wishlistRouter.delete('/wishlist/:wishItemId', authorize, async (req, res, next) => {
  try {
    const { wishItemId } = req.params;
    const collection = database.collection(PLAYSTATION_WISHLIST);
    const result = await collection.deleteOne({ _id: new ObjectId(wishItemId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Item '${wishItemId}' not found`);
    }
    return res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
});

export default wishlistRouter;
