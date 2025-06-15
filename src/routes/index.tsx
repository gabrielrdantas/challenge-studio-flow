import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Studio from '../pages/Studio';
import { Layout } from '../shared/components/layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Studio />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
