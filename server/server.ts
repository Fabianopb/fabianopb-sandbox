import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';

import wishlistRouter from './playstation/wishlist';
import badgesRouter from './portfolio/badges';
import projectsRouter from './portfolio/projects';
import skillsRouter from './portfolio/skills';
import usersRouter from './root/users';
import * as playstationCronJobs from './playstation/cronJobs';
import * as rootCronJobs from './root/cronJobs';

const port = process.env.PORT || 9000;

export const init = () => {
  const app = express();

  app.use(morgan('common'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/root', [usersRouter]);
  app.use('/api/v1/portfolio', [skillsRouter, badgesRouter, projectsRouter]);
  app.use('/api/v1/playstation', [wishlistRouter]);

  app.use(express.static(path.resolve('fpb-dist')));

  app.get('*', (_, response) => {
    response.sendFile(path.resolve('fpb-dist', 'index.html'));
  });

  app.use((error: any, _1: Request, res: Response, _2: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const name = error.name || 'Unknown error!';
    const message = error.message || 'Unknown error!';
    res.status(statusCode).json({ statusCode, name, message, fullError: error });
  });

  app.listen(port);
  console.log(`Server up and running on :${port}`);

  playstationCronJobs.init();
  rootCronJobs.init();
};
