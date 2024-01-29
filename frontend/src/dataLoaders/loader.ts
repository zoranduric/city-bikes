import { LoaderFunctionArgs } from 'react-router-dom';

export const stationsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<StationType[]> => {
  console.log(params);
  const skip = (Number(params.pageNumber) - 1) * 10;
  const response = await fetch(
    `http://localhost:5000/stations?take=10&skip=${skip}`
  );
  if (!response.ok) throw new Error('Failed to load stations');
  const stations = await response.json();
  return stations;
};
export const paginationLoader = async (): Promise<number> => {
  const response = await fetch('http://localhost:5000/stations/count');
  if (!response.ok) throw new Error('Failed to fetch station count');
  const count = await response.json();
  return count;
};
