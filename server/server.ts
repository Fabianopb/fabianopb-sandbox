import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import psStoreRouter from './playstation/psStore';
import wishlistRouter from './playstation/wishlist';
import badgesRouter from './portfolio/badges';
import projectsRouter from './portfolio/projects';
import skillsRouter from './portfolio/skills';
import usersRouter from './root/users';

const port = process.env.PORT || 9000;

export const init = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/root', [usersRouter]);
  app.use('/api/v1/portfolio', [skillsRouter, badgesRouter, projectsRouter]);
  app.use('/api/v1/playstation', [psStoreRouter, wishlistRouter]);

  app.use(express.static(path.resolve('fpb-dist')));

  app.get('*', (_, response) => {
    response.sendFile(path.resolve('fpb-dist', 'index.html'));
  });

  app.use((error: any, _1: Request, res: Response, _2: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const name = error.name || 'Unknown error!';
    const message = error.message || 'Unknown error!';
    res.status(statusCode).json({ statusCode, name, message });
  });

  app.listen(port);

  console.log(`Server up and running on :${port}`);
};
