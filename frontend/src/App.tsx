import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>City bikes</h1>
      <Link to='/'>Home</Link>
      <Outlet />
    </>
  );
}

export default App;
