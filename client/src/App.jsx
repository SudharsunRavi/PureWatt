import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Home  from "./Pages/Home";
import Login  from "./Pages/Login";
import Register from "./Pages/Register";
import Powerplant from './admin_components/Powerplant';
import EditPowerplant from './admin_components/EditPowerplant';
import Navbar from './components/Navbar';

import SolarPlantDetails from './Pages/SolarPlantDetails';
import WindPlantDetails from './Pages/WindPlantDetails';

import FinancialParam from './admin_components/FinancialParam';
import EditFinancialParam from './admin_components/EditFinancialParam';
import Proposal from './admin_components/Proposal';

import AdminSpace from './admin_components/AdminSpace';
import AdminDashboard from './Pages/AdminDashboard';

import Solarplant from './admin_components/SolarPlant';
import EditSolarplant from './admin_components/EditSolarplant';
import Windplant from './admin_components/Windplant';
import EditWindplant from './admin_components/EditWindplant';
import UserDashboard from './pages/UserDashboard';

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
          },
          {
            path: '/admindashboard',
            element: <AdminDashboard />
          },
          {
            path: '/solarplant',
            element: <Solarplant />
          },
          {
            path: '/solarplant-edit/:id',
            element: <EditSolarplant />
          },
          {
            path: '/windplant',
            element: <Windplant />
          },
          {
            path: 'windplant-edit/:id',
            element: <EditWindplant />
          },
          {
            path: '/userdashboard',
            element: <UserDashboard />
          }
      ]
    }
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
