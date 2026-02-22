/**
 * Router Configuration
 */

import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from './features/admin/AdminLayout';
import { AdminDashboard } from './features/admin/pages/AdminDashboard';
import { AdminLogin } from './features/admin/pages/AdminLogin';
import { MobileLayout } from './features/mobile/MobileLayout';
import { MobileEditProfile } from './features/mobile/pages/MobileEditProfile';
import { MobileHistory } from './features/mobile/pages/MobileHistory';
import { MobileHome } from './features/mobile/pages/MobileHome';
import { MobileLogin } from './features/mobile/pages/MobileLogin';
import { MobileProfile } from './features/mobile/pages/MobileProfile';
import { MobileScan } from './features/mobile/pages/MobileScan';
import { MobileSession } from './features/mobile/pages/MobileSession';
import { MobileSettings } from './features/mobile/pages/MobileSettings';
import { MobileSignup } from './features/mobile/pages/MobileSignup';
import { QuickLayout } from './features/quickAccess/QuickLayout';
import { QuickAbout } from './features/quickAccess/pages/QuickAbout';
import { QuickDashboard } from './features/quickAccess/pages/QuickDashboard';
import { QuickScan } from './features/quickAccess/pages/QuickScan';
import { QuickSplash } from './features/quickAccess/pages/QuickSplash';
import { HomePage } from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/mobile/login',
    element: <MobileLogin />,
  },
  {
    path: '/mobile/signup',
    element: <MobileSignup />,
  },
  {
    path: '/mobile/scan',
    element: <MobileScan />,
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
        path: 'home',
        element: <MobileHome />,
      },
      {
        path: 'session',
        element: <MobileSession />,
      },
      {
        path: 'profile',
        element: <MobileProfile />,
      },
      {
        path: 'edit-profile',
        element: <MobileEditProfile />,
      },
      {
        path: 'history',
        element: <MobileHistory />,
      },
      {
        path: 'settings',
        element: <MobileSettings />,
      },
    ],
  },
  {
    path: '/quick/scan',
    element: <QuickScan />,
  },
  {
    path: '/quick',
    element: <QuickLayout />,
    children: [
      {
        index: true,
        element: <QuickSplash />,
      },
      {
        path: 'dashboard',
        element: <QuickDashboard />,
      },
      {
        path: 'about',
        element: <QuickAbout />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
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
