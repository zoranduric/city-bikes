import morgan from 'morgan';
import cors from 'cors';
import express, { Application, Response } from 'express';
import { stationsRouter } from './stations/router';
import { errorHandler } from './middlewares/middleware';

const app: Application = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/stations', stationsRouter);

app.get('/', (_req, res: Response) => {
  res.json({
    message: 'Sever is running.',
  });
});

app.use(errorHandler);

export const server = app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

export default app;
