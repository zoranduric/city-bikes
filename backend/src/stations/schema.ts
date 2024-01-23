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

export type StationCount = z.infer<typeof stationCountSchema>;
export type Stations = z.infer<typeof stationsSchema>;
