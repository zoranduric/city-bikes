import { Link, Outlet, useLoaderData } from 'react-router-dom';
import Pagination from './Pagination/Pagination';

function App() {
  const stationsCount = useLoaderData() as number;
  return (
    <>
      <h1>City bikes</h1>
      <Link to='/'>Home</Link>
      <Outlet />
      <Pagination stationsCount={stationsCount} />
    </>
  );
}

export default App;
