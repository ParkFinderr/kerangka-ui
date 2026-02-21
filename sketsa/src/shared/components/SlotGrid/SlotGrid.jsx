/**
 * Slot Grid Component
 * Supports both floor view and simple grid view
 */

import { ParkingFloorView } from '../ParkingFloorView/ParkingFloorView';
import { SlotCard } from '../SlotCard/SlotCard';
import './SlotGrid.css';

export function SlotGrid({ 
  slots = [], 
  onSlotSelect, 
  showDetails = false,
  viewMode = 'floor' // 'floor' or 'grid'
}) {
  if (slots.length === 0) {
    return (
      <div className="slot-grid-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p>Tidak ada slot parkir tersedia</p>
      </div>
    );
  }

  // Use floor view if slots have floor property
  const hasFloorData = slots.some(slot => slot.floor !== undefined);
  const shouldUseFloorView = viewMode === 'floor' && hasFloorData;

  if (shouldUseFloorView) {
    return (
      <ParkingFloorView 
        slots={slots} 
        onSlotSelect={onSlotSelect} 
        showDetails={showDetails} 
      />
    );
  }

  // Fallback to simple grid view
  return (
    <div className="slot-grid">
      {slots.map((slot) => (
        <SlotCard
          key={slot.id}
          slot={slot}
          onSelect={onSlotSelect}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
}
