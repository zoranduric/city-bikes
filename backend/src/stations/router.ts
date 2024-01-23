import express from 'express';
import { stationController } from './controller';

const stationsRouter = express.Router();

stationsRouter.route('/count').get(stationController.getStationCount);

export { stationsRouter };
