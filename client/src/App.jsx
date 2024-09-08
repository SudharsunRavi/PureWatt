import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Home  from "./Pages/Home";
import Login  from "./Pages/Login";
import Register from "./Pages/Register";

const AppLayout = () => {
  return (
      <div>
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
      ]
    }
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
