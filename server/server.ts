import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import skillsRouter from './portfolio/skills';
import usersRouter from './portfolio/users';

const port = process.env.PORT || 9000;

export const init = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/portfolio', [skillsRouter, usersRouter]);

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
};
