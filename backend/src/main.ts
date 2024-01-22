import morgan from 'morgan';
import cors from 'cors';
import express, { Application, Response } from 'express';

const app: Application = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.get('/', (_req, res: Response) => {
  res.json({
    message: 'Sever is running.',
  });
});

export const server = app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

export default app;
