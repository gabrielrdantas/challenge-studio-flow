import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/layout';
import Production from '../pages/production';
import Studio from '../pages/studio';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: 'production/:id',
        element: <Studio />,
      },
      {
        path: '/',
        element: <Production />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
