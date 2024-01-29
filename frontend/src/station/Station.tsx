import { useLoaderData, useLocation } from 'react-router-dom';

const Station = () => {
  const { state } = useLocation() as StationNameType;
  const {
    total_starting_journeys,
    total_journeys_ending,
    average_distance,
    average_duration_starting,
  } = useLoaderData() as StationDataType;

  return (
    <div>
      <h3>Station {state.stationName}</h3>
      <h4>Address: {state.stationAddress}</h4>

      <div>
        <p>
          Total number of journeys starting from the station:{' '}
          {total_starting_journeys}
        </p>
        <p>
          Total number of journeys ending at the station:{' '}
          {total_journeys_ending}
        </p>
        <p>
          Average distance of journeys starting from the station:{' '}
          {average_distance}
        </p>
        <p>
          Avarage duration of journeys starting from the station:{' '}
          {average_duration_starting}
        </p>
      </div>
    </div>
  );
};

export default Station;
