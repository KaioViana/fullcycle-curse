import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  server: Express;
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
