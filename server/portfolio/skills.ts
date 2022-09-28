import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { database } from '../database';
import { NotFoundError } from '../utils';
import auth from './auth';
import { PORTFOLIO_SKILLS } from './collections';

type Skill = {
  name: string;
  value: number;
  type: 'skill' | 'tool';
};

const skillsRouter = Router();

skillsRouter.get('/skills', async (_, res, next) => {
  try {
    const collection = database.collection(PORTFOLIO_SKILLS);
    const cursor = collection.find();
    const skills = await cursor.toArray();
    return res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
});

skillsRouter.post('/skills', auth, async (req, res, next) => {
  try {
    const collection = database.collection(PORTFOLIO_SKILLS);
    const skills = req.body;
    await collection.insertMany(skills);
    return res.status(200).json('Items created');
  } catch (error) {
    next(error);
  }
});

skillsRouter.put('/skills/:skillId', auth, async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const skill = req.body;
    const replaceDocument: Skill = { name: skill.name, value: skill.value, type: skill.type };
    const collection = database.collection(PORTFOLIO_SKILLS);
    const result = await collection.replaceOne({ _id: new ObjectId(skillId) }, replaceDocument);
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Item '${skillId}' not found`);
    }
    return res.status(200).json({ message: 'Item updated' });
  } catch (error) {
    next(error);
  }
});

skillsRouter.delete('/skills/:skillId', auth, async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const collection = database.collection(PORTFOLIO_SKILLS);
    const result = await collection.deleteOne({ _id: new ObjectId(skillId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Item '${skillId}' not found`);
    }
    return res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
});

export default skillsRouter;
