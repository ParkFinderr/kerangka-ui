/**
 * Slot State Machine
 * Pure function untuk menentukan state transition
 */

import { SLOT_STATUS } from '../constants/slotStatus';

// Event types
export const EVENT_TYPES = {
  BOOK: 'BOOK',
  ACTIVATE: 'ACTIVATE',
  COMPLETE: 'COMPLETE',
  FORCE_COMPLETE: 'FORCE_COMPLETE',
  SENSOR_OCCUPIED_WITHOUT_ARRIVE: 'SENSOR_OCCUPIED_WITHOUT_ARRIVE',
  UNAUTHORIZED_OCCUPY: 'UNAUTHORIZED_OCCUPY',
  GHOST_SWAP: 'GHOST_SWAP',
  SET_MAINTENANCE: 'SET_MAINTENANCE',
  CLEAR_MAINTENANCE: 'CLEAR_MAINTENANCE',
  CLEAR_UNAUTHORIZED: 'CLEAR_UNAUTHORIZED',
};

/**
 * State transition rules
 * @param {string} currentState - Current slot status
 * @param {string} eventType - Event type
 * @returns {string} Next slot status
 */
export function getNextSlotState(currentState, eventType) {
  const transitions = {
    // AVAILABLE state transitions
    [SLOT_STATUS.AVAILABLE]: {
      [EVENT_TYPES.BOOK]: SLOT_STATUS.BOOKED,
      [EVENT_TYPES.UNAUTHORIZED_OCCUPY]: SLOT_STATUS.OCCUPIED_UNAUTHORIZED,
      [EVENT_TYPES.SET_MAINTENANCE]: SLOT_STATUS.MAINTENANCE,
    },
    
    // BOOKED state transitions
    [SLOT_STATUS.BOOKED]: {
      [EVENT_TYPES.ACTIVATE]: SLOT_STATUS.ACTIVE,
      [EVENT_TYPES.SENSOR_OCCUPIED_WITHOUT_ARRIVE]: SLOT_STATUS.INTRUSION,
      [EVENT_TYPES.FORCE_COMPLETE]: SLOT_STATUS.AVAILABLE,
      [EVENT_TYPES.SET_MAINTENANCE]: SLOT_STATUS.MAINTENANCE,
    },
    
    // ACTIVE state transitions
    [SLOT_STATUS.ACTIVE]: {
      [EVENT_TYPES.COMPLETE]: SLOT_STATUS.COMPLETED,
      [EVENT_TYPES.FORCE_COMPLETE]: SLOT_STATUS.AVAILABLE,
      [EVENT_TYPES.GHOST_SWAP]: SLOT_STATUS.OCCUPIED_UNAUTHORIZED,
      [EVENT_TYPES.SET_MAINTENANCE]: SLOT_STATUS.MAINTENANCE,
    },
    
    // OCCUPIED_UNAUTHORIZED state transitions
    [SLOT_STATUS.OCCUPIED_UNAUTHORIZED]: {
      [EVENT_TYPES.CLEAR_UNAUTHORIZED]: SLOT_STATUS.AVAILABLE,
      [EVENT_TYPES.FORCE_COMPLETE]: SLOT_STATUS.AVAILABLE,
      [EVENT_TYPES.SET_MAINTENANCE]: SLOT_STATUS.MAINTENANCE,
    },
    
    // INTRUSION state transitions
    [SLOT_STATUS.INTRUSION]: {
      [EVENT_TYPES.CLEAR_UNAUTHORIZED]: SLOT_STATUS.BOOKED,
      [EVENT_TYPES.FORCE_COMPLETE]: SLOT_STATUS.AVAILABLE,
      [EVENT_TYPES.SET_MAINTENANCE]: SLOT_STATUS.MAINTENANCE,
    },
    
    // MAINTENANCE state transitions
    [SLOT_STATUS.MAINTENANCE]: {
      [EVENT_TYPES.CLEAR_MAINTENANCE]: SLOT_STATUS.AVAILABLE,
    },
    
    // COMPLETED state transitions
    [SLOT_STATUS.COMPLETED]: {
      [EVENT_TYPES.COMPLETE]: SLOT_STATUS.AVAILABLE, // Auto transition after complete
    },
  };

  // Get next state from transition map
  const nextState = transitions[currentState]?.[eventType];
  
  // If transition exists, return next state, otherwise keep current state
  return nextState || currentState;
}

/**
 * Check if a transition is valid
 * @param {string} currentState
 * @param {string} eventType
 * @returns {boolean}
 */
export function isValidTransition(currentState, eventType) {
  const nextState = getNextSlotState(currentState, eventType);
  return nextState !== currentState;
}
