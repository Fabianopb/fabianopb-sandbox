import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { database } from '../database';
import auth from './auth';
import { PORTFOLIO_SKILLS } from './collections';

type Skill = {
  name: string;
  value: number;
};

const skillsRouter = Router();

skillsRouter.get('/skills', async (_, response, next) => {
  try {
    const collection = database.collection(PORTFOLIO_SKILLS);
    const cursor = collection.find();
    const skills = await cursor.toArray();
    return response.status(200).json(skills);
  } catch (error) {
    next(error);
  }
});

skillsRouter.post('/skills', auth, async (request, response, next) => {
  try {
    const collection = database.collection(PORTFOLIO_SKILLS);
    const skills = request.body;
    await collection.insertMany(skills);
    return response.status(200).json('Items created');
  } catch (error) {
    next(error);
  }
});

skillsRouter.put('/skills/:skillId', auth, async (request, response, next) => {
  try {
    const { skillId } = request.params;
    const skill = request.body;
    const replaceDocument: Skill = { name: skill.name, value: skill.value };
    const collection = database.collection(PORTFOLIO_SKILLS);
    const result = await collection.replaceOne({ _id: new ObjectId(skillId) }, replaceDocument);
    if (result.matchedCount === 0) {
      return response.status(404).send('Item not found');
    }
    return response.status(200).json({ message: 'Item updated' });
  } catch (error) {
    next(error);
  }
});

skillsRouter.delete('/skills/:skillId', auth, async (request, response, next) => {
  try {
    const { skillId } = request.params;
    const collection = database.collection(PORTFOLIO_SKILLS);
    const result = await collection.deleteOne({ _id: new ObjectId(skillId) });
    if (result.deletedCount === 0) {
      return response.status(404).send('Item not found');
    }
    return response.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
});

export default skillsRouter;
