import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { database } from '../database';
import { NotFoundError } from '../utils';
import auth from './auth';
import { PORTFOLIO_PROJECTS } from './collections';

const projectsRouter = Router();

projectsRouter.get('/projects', async (_, res, next) => {
  try {
    const collection = database.collection(PORTFOLIO_PROJECTS);
    const cursor = collection.find();
    const projects = await cursor.toArray();
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

projectsRouter.post('/projects', auth, async (req, res, next) => {
  try {
    const collection = database.collection(PORTFOLIO_PROJECTS);
    const project = req.body;
    const result = await collection.insertOne(project);
    return res.status(200).json(result.insertedId);
  } catch (error) {
    next(error);
  }
});

projectsRouter.put('/projects/:projectId', auth, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = req.body;
    const replaceDocument = project;
    const collection = database.collection(PORTFOLIO_PROJECTS);
    const result = await collection.replaceOne({ _id: new ObjectId(projectId) }, replaceDocument);
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Item '${projectId}' not found`);
    }
    return res.status(200).json({ message: 'Item updated' });
  } catch (error) {
    next(error);
  }
});

projectsRouter.delete('/projects/:projectId', auth, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const collection = database.collection(PORTFOLIO_PROJECTS);
    const result = await collection.deleteOne({ _id: new ObjectId(projectId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Item '${projectId}' not found`);
    }
    return res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
});

export default projectsRouter;
