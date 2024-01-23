import express from 'express';
import { stationController } from './controller';

const stationsRouter = express.Router();

stationsRouter.route('/count').get(stationController.getStationCount);
stationsRouter.route('/').get(stationController.getStations);
stationsRouter.route('/:id').get(stationController.getStation);

export { stationsRouter };
