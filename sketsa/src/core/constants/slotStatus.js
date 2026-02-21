/**
 * Slot Status Constants
 * Enum untuk status slot parking
 */

export const SLOT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  BOOKED: 'BOOKED',
  ACTIVE: 'ACTIVE',
  OCCUPIED_UNAUTHORIZED: 'OCCUPIED_UNAUTHORIZED',
  INTRUSION: 'INTRUSION',
  MAINTENANCE: 'MAINTENANCE',
  COMPLETED: 'COMPLETED',
};

export const STATUS_LABELS = {
  [SLOT_STATUS.AVAILABLE]: 'Tersedia',
  [SLOT_STATUS.BOOKED]: 'Dipesan',
  [SLOT_STATUS.ACTIVE]: 'Aktif',
  [SLOT_STATUS.OCCUPIED_UNAUTHORIZED]: 'Parkir Liar',
  [SLOT_STATUS.INTRUSION]: 'Intrusi Terdeteksi',
  [SLOT_STATUS.MAINTENANCE]: 'Maintenance',
  [SLOT_STATUS.COMPLETED]: 'Selesai',
};

export const STATUS_COLORS = {
  [SLOT_STATUS.AVAILABLE]: '#10b981',      // Green
  [SLOT_STATUS.BOOKED]: '#f59e0b',         // Yellow
  [SLOT_STATUS.ACTIVE]: '#3b82f6',         // Blue
  [SLOT_STATUS.OCCUPIED_UNAUTHORIZED]: '#ef4444', // Red
  [SLOT_STATUS.INTRUSION]: '#dc2626',      // Dark Red
  [SLOT_STATUS.MAINTENANCE]: '#6b7280',    // Gray
  [SLOT_STATUS.COMPLETED]: '#8b5cf6',      // Purple
};
