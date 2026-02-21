/**
 * Custom hook to access Parking Context
 */

import { useContext } from 'react';
import { ParkingContext } from './ParkingContext';

export function useParkingStore() {
  const context = useContext(ParkingContext);

  if (!context) {
    throw new Error('useParkingStore must be used within ParkingProvider');
  }

  return context;
}
