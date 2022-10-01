import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { database } from '../database';
import { NotFoundError } from '../utils';
import auth from './auth';
import { PORTFOLIO_BADGES } from './collections';

type Badge = {
  name: string;
  imageSrc: string;
  href: string;
};

const badgesRouter = Router();

badgesRouter.get('/badges', async (_, res, next) => {
  try {
    const collection = database.collection(PORTFOLIO_BADGES);
    const cursor = collection.find();
    const badges = await cursor.toArray();
    return res.status(200).json(badges);
  } catch (error) {
    next(error);
  }
});

badgesRouter.post('/badges', auth, async (req, res, next) => {
  try {
    const collection = database.collection(PORTFOLIO_BADGES);
    const badge = req.body;
    await collection.insertOne(badge);
    return res.status(200).json('Items created');
  } catch (error) {
    next(error);
  }
});

badgesRouter.put('/badges/:badgeId', auth, async (req, res, next) => {
  try {
    const { badgeId } = req.params;
    const badge = req.body as Badge;
    const replaceDocument = badge;
    const collection = database.collection(PORTFOLIO_BADGES);
    const result = await collection.replaceOne({ _id: new ObjectId(badgeId) }, replaceDocument);
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Item '${badgeId}' not found`);
    }
    return res.status(200).json({ message: 'Item updated' });
  } catch (error) {
    next(error);
  }
});

badgesRouter.delete('/badges/:badgeId', auth, async (req, res, next) => {
  try {
    const { badgeId } = req.params;
    const collection = database.collection(PORTFOLIO_BADGES);
    const result = await collection.deleteOne({ _id: new ObjectId(badgeId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Item '${badgeId}' not found`);
    }
    return res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
});

export default badgesRouter;
