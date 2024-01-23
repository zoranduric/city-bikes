import { NextFunction, Request, Response } from 'express';
import { createDatabasePool } from '../db';
import { queryStationsSchema, stationCountSchema, stationsSchema } from './schema';

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

async function getStations(req: Request, res: Response, next: NextFunction): Promise<void> {
  const client = await initializeClient.connect();
  const query = queryStationsSchema.safeParse(req.query);

  if (!query.success) {
    next(query.error);
    return;
  }
  try {
    if (query.success) {
      const result = await client.query(
        `SELECT * FROM station ORDER BY station_name ASC OFFSET ${query.data.skip} LIMIT ${query.data.take} `
      );
      const parseResults = result.rows.map((row) => stationsSchema.parse(row));
      if (!parseResults) {
        next();
        return;
      }
      if (parseResults.length === 0) {
        next(new Error('no stations found'));
        return;
      }
      res.status(200).send(parseResults);
    }
  } finally {
    client.release();
  }
}

export const stationController = {
  getStationCount,
  getStations,
};
