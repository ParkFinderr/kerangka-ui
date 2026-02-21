/**
 * Slot Grid Component
 */

import { SlotCard } from '../SlotCard/SlotCard';
import './SlotGrid.css';

export function SlotGrid({ slots = [], onSlotSelect, showDetails = false }) {
  if (slots.length === 0) {
    return (
      <div className="slot-grid-empty">
        <p>Tidak ada slot tersedia</p>
      </div>
    );
  }

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
