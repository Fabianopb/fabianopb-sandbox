import express, { NextFunction, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
// import exampleRoutes from './examples/routes';

(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment!');
  }
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
  } finally {
    await client.close();
  }

  const port = process.env.PORT || 9000;

  const app = express();

  app.get('/api/v1/hello', (_, response) => {
    response.json('Hello new world!');
  });

  // app.use('/api/v1', [exampleRoutes]);

  app.use(express.static(path.resolve('dist')));

  app.get('*', (_, response) => {
    response.sendFile(path.resolve('dist', 'index.html'));
  });

  app.use((error: any, _1: Request, res: Response, _2: NextFunction) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ statusCode, error: error.message });
  });

  app.listen(port);

  console.log(`Server up and running on :${port}`);
})();
