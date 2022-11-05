import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { database } from '../database';
import { NotFoundError } from '../utils';
import auth from '../auth';
import { PLAYSTATION_WISHLIST } from './collections';

const authorize = auth('playstation_user');

const wishlistRouter = Router();

wishlistRouter.get('/wishlist', authorize, async (_, res, next) => {
  try {
    const collection = database.collection(PLAYSTATION_WISHLIST);
    const cursor = collection.find();
    const wishlist = await cursor.toArray();
    return res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
});

wishlistRouter.post('/wishlist', authorize, async (req, res, next) => {
  try {
    const collection = database.collection(PLAYSTATION_WISHLIST);
    const wishItem = req.body;
    await collection.insertOne(wishItem);
    return res.status(200).json('Items created');
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