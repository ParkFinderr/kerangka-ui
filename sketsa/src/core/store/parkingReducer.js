/**
 * Parking Reducer
 * All state changes must go through this reducer
 */

import { SLOT_STATUS } from '../constants/slotStatus';
import { EVENT_TYPES, getNextSlotState } from '../stateMachine/slotStateMachine';

// Action Types
export const ACTION_TYPES = {
  SET_SLOTS: 'SET_SLOTS',
  BOOK_SLOT: 'BOOK_SLOT',
  CANCEL_BOOKING: 'CANCEL_BOOKING',
  ACTIVATE_SESSION: 'ACTIVATE_SESSION',
  COMPLETE_SESSION: 'COMPLETE_SESSION',
  FORCE_COMPLETE: 'FORCE_COMPLETE',
  SET_MAINTENANCE: 'SET_MAINTENANCE',
  CLEAR_MAINTENANCE: 'CLEAR_MAINTENANCE',
  INTRUSION_DETECTED: 'INTRUSION_DETECTED',
  UNAUTHORIZED_OCCUPIED: 'UNAUTHORIZED_OCCUPIED',
  GHOST_SWAP: 'GHOST_SWAP',
  CLEAR_UNAUTHORIZED: 'CLEAR_UNAUTHORIZED',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_ACTIVE_SESSION: 'SET_ACTIVE_SESSION',
};

// Initial State
export const initialState = {
  slots: [],
  activeSession: null,
  notifications: [],
};

/**
 * Main Reducer
 */
export function parkingReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_SLOTS:
      return {
        ...state,
        slots: action.payload,
      };

    case ACTION_TYPES.BOOK_SLOT: {
      const { slotId, userId, userName, vehicleNumber } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.AVAILABLE) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.BOOK);
          return {
            ...slot,
            status: nextStatus,
            bookedBy: userId,
            userName,
            vehicleNumber,
            bookedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'success',
            message: `Slot ${slotId} berhasil dipesan oleh ${userName}`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.CANCEL_BOOKING: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.BOOKED) {
          return {
            ...slot,
            status: SLOT_STATUS.AVAILABLE,
            bookedBy: null,
            userName: null,
            vehicleNumber: null,
            bookedAt: null,
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'info',
            message: `Booking slot ${slotId} telah dibatalkan`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.ACTIVATE_SESSION: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.BOOKED) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.ACTIVATE);
          return {
            ...slot,
            status: nextStatus,
            activatedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      const activeSlot = updatedSlots.find((s) => s.id === slotId);

      return {
        ...state,
        slots: updatedSlots,
        activeSession: activeSlot,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'info',
            message: `Sesi parking aktif di Slot ${slotId}`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.COMPLETE_SESSION: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.ACTIVE) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.COMPLETE);
          return {
            ...slot,
            status: nextStatus,
            completedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      // Auto clear completed status after 2 seconds
      setTimeout(() => {
        // This will be handled by auto-cleanup in component
      }, 2000);

      return {
        ...state,
        slots: updatedSlots,
        activeSession: null,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'success',
            message: `Sesi parking di Slot ${slotId} selesai`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.FORCE_COMPLETE: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            status: SLOT_STATUS.AVAILABLE,
            bookedBy: null,
            userName: null,
            vehicleNumber: null,
            bookedAt: null,
            activatedAt: null,
            completedAt: null,
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        activeSession: state.activeSession?.id === slotId ? null : state.activeSession,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'warning',
            message: `Slot ${slotId} di-force complete oleh admin`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.SET_MAINTENANCE: {
      const { slotId, reason } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            status: SLOT_STATUS.MAINTENANCE,
            maintenanceReason: reason || 'Under maintenance',
            maintenanceStartedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'info',
            message: `Slot ${slotId} dalam maintenance`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.CLEAR_MAINTENANCE: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.MAINTENANCE) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.CLEAR_MAINTENANCE);
          return {
            ...slot,
            status: nextStatus,
            maintenanceReason: null,
            maintenanceStartedAt: null,
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'success',
            message: `Slot ${slotId} maintenance selesai`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.INTRUSION_DETECTED: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.BOOKED) {
          const nextStatus = getNextSlotState(
            slot.status,
            EVENT_TYPES.SENSOR_OCCUPIED_WITHOUT_ARRIVE
          );
          return {
            ...slot,
            status: nextStatus,
            intrusionDetectedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'error',
            message: `🚨 INTRUSI TERDETEKSI di Slot ${slotId}! Kendaraan tidak sah terdeteksi.`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.UNAUTHORIZED_OCCUPIED: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.AVAILABLE) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.UNAUTHORIZED_OCCUPY);
          return {
            ...slot,
            status: nextStatus,
            unauthorizedOccupiedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'error',
            message: `⚠️ Parkir liar terdeteksi di Slot ${slotId}`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.GHOST_SWAP: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (slot.id === slotId && slot.status === SLOT_STATUS.ACTIVE) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.GHOST_SWAP);
          return {
            ...slot,
            status: nextStatus,
            ghostSwapDetectedAt: new Date().toISOString(),
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'error',
            message: `🔄 GHOST SWAP terdeteksi di Slot ${slotId}! Kendaraan berbeda terdeteksi.`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.CLEAR_UNAUTHORIZED: {
      const { slotId } = action.payload;
      const updatedSlots = state.slots.map((slot) => {
        if (
          slot.id === slotId &&
          (slot.status === SLOT_STATUS.OCCUPIED_UNAUTHORIZED ||
            slot.status === SLOT_STATUS.INTRUSION)
        ) {
          const nextStatus = getNextSlotState(slot.status, EVENT_TYPES.CLEAR_UNAUTHORIZED);
          return {
            ...slot,
            status: nextStatus,
            unauthorizedOccupiedAt: null,
            ghostSwapDetectedAt: null,
            intrusionDetectedAt: null,
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: updatedSlots,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: 'success',
            message: `Slot ${slotId} berhasil dibersihkan`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }

    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };

    case ACTION_TYPES.SET_ACTIVE_SESSION:
      return {
        ...state,
        activeSession: action.payload,
      };

    default:
      return state;
  }
}
