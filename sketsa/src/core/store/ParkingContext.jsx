/**
 * Parking Context Provider
 * Global state provider untuk seluruh aplikasi
 */

import { createContext, useReducer, useEffect } from 'react';
import { parkingReducer, initialState, ACTION_TYPES } from './parkingReducer';
import { generateDummySlots } from '../../mock/dummySlots';

export const ParkingContext = createContext(null);

export function ParkingProvider({ children }) {
  const [state, dispatch] = useReducer(parkingReducer, initialState);

  // Initialize slots on mount
  useEffect(() => {
    const slots = generateDummySlots(20); // Generate 20 parking slots
    dispatch({ type: ACTION_TYPES.SET_SLOTS, payload: slots });
  }, []);

  // Auto-clear completed slots after 2 seconds
  useEffect(() => {
    const completedSlots = state.slots.filter((slot) => slot.status === 'COMPLETED');
    
    if (completedSlots.length > 0) {
      const timers = completedSlots.map((slot) => {
        return setTimeout(() => {
          dispatch({
            type: ACTION_TYPES.FORCE_COMPLETE,
            payload: { slotId: slot.id },
          });
        }, 2000);
      });

      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [state.slots]);

  // Auto-remove old notifications after 5 seconds
  useEffect(() => {
    if (state.notifications.length > 0) {
      const timer = setTimeout(() => {
        const oldestNotification = state.notifications[0];
        if (oldestNotification) {
          dispatch({
            type: ACTION_TYPES.REMOVE_NOTIFICATION,
            payload: oldestNotification.id,
          });
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.notifications]);

  const value = {
    state,
    dispatch,
  };

  return (
    <ParkingContext.Provider value={value}>
      {children}
    </ParkingContext.Provider>
  );
}
