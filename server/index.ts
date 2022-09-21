import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
// import exampleRoutes from './examples/routes';

(async () => {
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
