import { NextFunction, Request, Response } from 'express';
import { createDatabasePool } from '../db';
import { stationCountSchema } from './schema';

const initializeClient = createDatabasePool();

async function getStationCount(_req: Request, res: Response, next: NextFunction): Promise<void> {
  const client = await initializeClient.connect();
  try {
    const result = await client.query('SELECT count (*) FROM station');
    const parsedRows = stationCountSchema.safeParse(result.rows);
    if (!parsedRows.success) {
      next(parsedRows.error);
      return;
    }
    if (parsedRows.data.length === 0) {
      next(new Error('no stations found'));
      return;
    }
    res.status(200).send(parsedRows.data[0].count.toString());
  } finally {
    client.release();
  }
}

export const stationController = {
  getStationCount,
};
