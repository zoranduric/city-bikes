import { useLoaderData } from 'react-router-dom';

const Stations = () => {
  const stations = useLoaderData() as StationType[];
  const stationTableHeader = [
    'Station ID',
    "Station's name",
    "Station's adress",
    'Cordinate x',
    'Cordinate y',
  ];

  return (
    <>
      {stations ? (
        <>
          <table>
            <thead>
              <tr>
                {stationTableHeader.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stations.map((station, index) => (
                <tr key={index}>
                  <td>{station.id}</td>
                  <td>{station.station_name}</td>
                  <td>{station.station_address}</td>
                  <td>{station.coordinate_x.substring(0, 10)}</td>
                  <td>{station.coordinate_y.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default Stations;
