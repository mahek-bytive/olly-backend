import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { CORS } from './config/server';
import v1Routes from './routes/v1/index.routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(express.json({ limit: '50kb' }));
    this.app.use(
      cors({
        origin: CORS.ORIGIN,
        credentials: CORS.CREDENTIALS,
      }),
    );
    // @todo: make this conditional based on the environment
    this.app.use(morgan('dev'));
  }

  private initializeRoutes() {
    this.app.use('/api/v1', v1Routes);

    this.app.get('/health-check', (_, res) => {
      res.send('Hello World!');
    });
  }
}

export default new App().app;
