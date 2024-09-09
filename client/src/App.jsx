import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Home  from "./Pages/Home";
import Login  from "./Pages/Login";
import Register from "./Pages/Register";
import Powerplant from './admin_components/Powerplant';
import EditPowerplant from './admin_components/EditPowerplant';
import Navbar from './components/Navbar';

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
