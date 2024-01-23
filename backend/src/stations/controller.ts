import { NextFunction, Request, Response } from 'express';
import { createDatabasePool } from '../db';
import {
  queryStationsSchema,
  stationCountSchema,
  stationDataSchema,
  stationsSchema,
} from './schema';
import { z } from 'zod';

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

type StationID = {
  id: number;
  station_name: string;
};
type stationDataQuery = {
  total_starting_journeys: string;
  total_journeys_ending: string;
  average_distance: string;
  average_duration_starting: string;
};

async function getStation(req: Request, res: Response, next: NextFunction): Promise<void> {
  const client = await initializeClient.connect();
  const id = z
    .number({
      coerce: true,
    })
    .int()
    .positive()
    .safeParse(req.params.id);
  if (!id.success) {
    next(id.error);
    return;
  }

  try {
    const stationID = id.data;
    const result = await client.query(`
    SELECT 
        (SELECT COUNT(*) FROM journey WHERE departure_station_id = ${stationID}) as total_starting_journeys,
        (SELECT COUNT(*) FROM journey WHERE return_station_id = ${stationID}) as total_journeys_ending,
        (SELECT AVG(distance) FROM journey WHERE departure_station_id = ${stationID}) as average_distance,
        (SELECT AVG(duration) FROM journey WHERE departure_station_id = ${stationID}) as average_duration_starting
`);

    console.log(result.rows[0]);
    const parsedResults = stationDataSchema.safeParse(result.rows[0]);
    if (!parsedResults.success) {
      next(parsedResults.error);
      return;
    }
    res.status(200).send(parsedResults.data);
  } catch (error) {
    next(error);
    return;
  } finally {
    client.release();
  }
}

export const stationController = {
  getStationCount,
  getStations,
  getStation,
};
