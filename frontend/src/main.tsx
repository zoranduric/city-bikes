import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  stationLoader,
  paginationLoader,
  stationsLoader,
} from './dataLoaders/loader.ts';
import Stations from './stations/Stations.tsx';
import Station from './station/Station.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} loader={paginationLoader}>
      <Route path='/' element={<Navigate to='/1' />} />

      <Route
        path='/:pageNumber'
        element={<Stations />}
        loader={stationsLoader}
      />
      <Route path='station/:id' element={<Station />} loader={stationLoader} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
