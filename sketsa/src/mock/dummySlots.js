/**
 * Dummy Parking Slots Generator
 */

import { SLOT_STATUS } from '../core/constants/slotStatus';

export function generateDummySlots(count = 20) {
  const slots = [];
  const zones = ['A', 'B', 'C', 'D'];

  for (let i = 1; i <= count; i++) {
    const zone = zones[Math.floor((i - 1) / 5) % zones.length];
    const slotNumber = ((i - 1) % 5) + 1;
    const slotId = `${zone}${slotNumber}`;

    slots.push({
      id: slotId,
      zone,
      number: slotNumber,
      status: SLOT_STATUS.AVAILABLE,
      bookedBy: null,
      userName: null,
      vehicleNumber: null,
      bookedAt: null,
      activatedAt: null,
      completedAt: null,
      maintenanceReason: null,
      maintenanceStartedAt: null,
      intrusionDetectedAt: null,
      unauthorizedOccupiedAt: null,
      ghostSwapDetectedAt: null,
    });
  }

  return slots;
}

// Dummy users for simulation
export const DUMMY_USERS = [
  { id: 'U001', name: 'Ahmad Yusuf', vehicle: 'B 1234 XYZ' },
  { id: 'U002', name: 'Siti Nurhaliza', vehicle: 'B 5678 ABC' },
  { id: 'U003', name: 'Budi Santoso', vehicle: 'D 9012 DEF' },
  { id: 'U004', name: 'Dewi Lestari', vehicle: 'B 3456 GHI' },
  { id: 'U005', name: 'Rudi Hermawan', vehicle: 'B 7890 JKL' },
];
