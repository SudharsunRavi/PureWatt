import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Home  from "./Pages/Home";
import Login  from "./Pages/Login";
import Register from "./Pages/Register";
import Powerplant from './admin_components/Powerplant';
import EditPowerplant from './admin_components/EditPowerplant';
import Navbar from './components/Navbar';

import SolarPlantDetails from './Pages/SolarPlantDetails';
import WindPlantDetails from './Pages/WindPlantDetails';
import HydroPlantDetails from './Pages/HydroPlantDetails';
import GeothermalPlantDetails from './Pages/GeothermalPlantDetails';

import FinancialParam from './admin_components/FinancialParam';
import EditFinancialParam from './admin_components/EditFinancialParam';
import Proposal from './admin_components/Proposal';

const AppLayout = () => {
  return (
      <div>
        <Navbar/>
        <Outlet />
      </div>
  );
};

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/solarplant-details',
            element: <SolarPlantDetails />
          },
          {
            path: '/windplant-details',
            element: <WindPlantDetails />
          },
          {
            path: '/hydroplant-details',
            element: <HydroPlantDetails />
          },
          {
            path: '/geothermalplant-details',
            element: <GeothermalPlantDetails />
          },
          {
            path: '/fundingreceived',
            element: <FinancialParam />
          },
          {
            path: '/fundingreceived-edit/:id',
            element: <EditFinancialParam />
          },
          {
            path: '/proposal',
            element: <Proposal />
          },
          {
            path: '/powerplant-create',
            element: <Powerplant />
          },
          {
            path: '/powerplant-edit/:id',
            element: <EditPowerplant />
          }
      ]
    }
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
