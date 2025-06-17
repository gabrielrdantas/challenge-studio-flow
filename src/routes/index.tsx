import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/layout';
import Production from '../pages/production';
import Studio from '../pages/studio';


export const routesConfig = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Production /> },
      { path: 'production/:id', element: <Studio /> },
    ],
  },
];
const router = createBrowserRouter(routesConfig);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
