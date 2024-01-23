import { number, z } from 'zod';

export const stationCountSchema = z.array(
  z.object({
    count: number({
      coerce: true,
    })
      .int()
      .positive(),
  })
);

export const stationsSchema = z.object({
  id: z
    .number({
      coerce: true,
    })
    .int()
    .gt(0),
  station_name: z.string().nullable(),
  station_address: z.string().nullable(),
  coordinate_x: z.string().nullable(),
  coordinate_y: z.string().nullable(),
});

export const queryStationsSchema = z.object({
  skip: number({ coerce: true }).min(0),
  take: number({ coerce: true }).positive().max(10),
});

export const stationDataSchema = z.object({
  //stationName: z.string(),
  total_starting_journeys: number({ coerce: true }).int().positive(),
  total_journeys_ending: number({ coerce: true }).int().positive(),
  average_distance: number({ coerce: true }).positive(),
  average_duration_starting: number({ coerce: true }).positive(),
});

export type StationCount = z.infer<typeof stationCountSchema>;
export type Stations = z.infer<typeof stationsSchema>;
export type StationData = z.infer<typeof stationDataSchema>;
