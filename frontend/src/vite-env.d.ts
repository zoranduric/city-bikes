/// <reference types="vite/client" />
type StationType = {
  id: number;
  station_name: string;
  station_address: string;
  coordinate_x: string;
  coordinate_y: string;
};
type StationDataType = {
  total_starting_journeys: number;
  total_journeys_ending: number;
  average_distance: number;
  average_duration_starting: number;
};
type StationNameType = {
  state: {
    stationName: string;
    stationAddress: string;
  };
};
