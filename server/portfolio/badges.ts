import { Router } from 'express';
import { database } from '../database';
import { PORTFOLIO_BADGES } from './collections';

// type Badge = {
//   name: string;
//   imageSrc: string;
//   href: string;
// };

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

export default badgesRouter;
