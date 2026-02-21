/**
 * Dummy Parking Slots Generator
 */

import { SLOT_STATUS } from '../core/constants/slotStatus';

export function generateDummySlots(count = 20) {
  const slots = [];
  
  // Multi-floor configuration
  // Floor 1: 12 slots (A1-A6, B1-B6)
  // Floor 2: 8 slots (C1-C4, D1-D4)
  const floorConfig = [
    { floor: 1, zones: ['A', 'B'], slotsPerZone: 6 },
    { floor: 2, zones: ['C', 'D'], slotsPerZone: 4 },
  ];

  floorConfig.forEach(({ floor, zones, slotsPerZone }) => {
    zones.forEach((zone) => {
      for (let i = 1; i <= slotsPerZone; i++) {
        const slotId = `${zone}${i}`;
        slots.push({
          id: slotId,
          zone,
          floor,
          number: i,
          position: i, // Position in zone for visual arrangement
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
    });
  });

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
