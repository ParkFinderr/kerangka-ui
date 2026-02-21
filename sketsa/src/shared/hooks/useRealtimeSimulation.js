/**
 * Realtime Simulation Hook
 * Simulates sensor events and real-time changes
 */

import { useEffect, useRef } from 'react';
import { SLOT_STATUS } from '../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../core/store/parkingReducer';
import { useParkingStore } from '../../core/store/useParkingStore';

export function useRealtimeSimulation(options = {}) {
  const {
    enableIntrusionSimulation = false,
    enableGhostSwapSimulation = false,
    enableUnauthorizedSimulation = false,
    simulationInterval = 15000, // 15 seconds
  } = options;

  const { state, dispatch } = useParkingStore();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (
      !enableIntrusionSimulation &&
      !enableGhostSwapSimulation &&
      !enableUnauthorizedSimulation
    ) {
      return;
    }

    // Start simulation
    intervalRef.current = setInterval(() => {
      const { slots } = state;

      // Random intrusion simulation
      if (enableIntrusionSimulation) {
        const bookedSlots = slots.filter((s) => s.status === SLOT_STATUS.BOOKED);
        if (bookedSlots.length > 0 && Math.random() > 0.7) {
          const randomSlot = bookedSlots[Math.floor(Math.random() * bookedSlots.length)];
          dispatch({
            type: ACTION_TYPES.INTRUSION_DETECTED,
            payload: { slotId: randomSlot.id },
          });
        }
      }

      // Random ghost swap simulation
      if (enableGhostSwapSimulation) {
        const activeSlots = slots.filter((s) => s.status === SLOT_STATUS.ACTIVE);
        if (activeSlots.length > 0 && Math.random() > 0.8) {
          const randomSlot = activeSlots[Math.floor(Math.random() * activeSlots.length)];
          dispatch({
            type: ACTION_TYPES.GHOST_SWAP,
            payload: { slotId: randomSlot.id },
          });
        }
      }

      // Random unauthorized parking simulation
      if (enableUnauthorizedSimulation) {
        const availableSlots = slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE);
        if (availableSlots.length > 0 && Math.random() > 0.85) {
          const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
          dispatch({
            type: ACTION_TYPES.UNAUTHORIZED_OCCUPIED,
            payload: { slotId: randomSlot.id },
          });
        }
      }
    }, simulationInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    enableIntrusionSimulation,
    enableGhostSwapSimulation,
    enableUnauthorizedSimulation,
    simulationInterval,
    state,
    dispatch,
  ]);

  return {
    isSimulating:
      enableIntrusionSimulation || enableGhostSwapSimulation || enableUnauthorizedSimulation,
  };
}
