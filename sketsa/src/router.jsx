/**
 * Router Configuration
 */

import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from './features/admin/AdminLayout';
import { AdminDashboard } from './features/admin/pages/AdminDashboard';
import { MobileLayout } from './features/mobile/MobileLayout';
import { MobileHome } from './features/mobile/pages/MobileHome';
import { MobileSession } from './features/mobile/pages/MobileSession';
import { QuickLayout } from './features/quickAccess/QuickLayout';
import { QuickDashboard } from './features/quickAccess/pages/QuickDashboard';
import { HomePage } from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/mobile',
    element: <MobileLayout />,
    children: [
      {
        index: true,
        element: <MobileHome />,
      },
      {
        path: 'session',
        element: <MobileSession />,
      },
    ],
  },
  {
    path: '/quick',
    element: <QuickLayout />,
    children: [
      {
        index: true,
        element: <QuickDashboard />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
]);
