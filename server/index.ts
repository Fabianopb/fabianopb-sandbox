import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

(async () => {
  const port = process.env.PORT || 9000;

  const app = express();
  
  app.get('/api/v1/hello', (_, response) => {
    response.json('Hello new world!');
  });
  
  app.use(express.static(path.resolve('dist')));

  app.get('*', (request, response) => {
    response.sendFile(path.resolve('index.html'));
  });
  
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ statusCode, error: error.message });
  });
  
  app.listen(port);

  console.log(`Server up and running on :${port}`);
})();
