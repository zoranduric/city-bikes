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

export type StationCount = z.infer<typeof stationCountSchema>;
