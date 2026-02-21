/**
 * Main App Component
 * Wrapped with ParkingProvider for global state
 */

import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ParkingProvider } from './core/store/ParkingContext';
import { router } from './router';

function App() {
  return (
    <ParkingProvider>
      <RouterProvider router={router} />
    </ParkingProvider>
  );
}

export default App;
