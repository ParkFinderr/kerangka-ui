/**
 * Slot Card Component
 */

import { SLOT_STATUS, STATUS_COLORS } from '../../../core/constants/slotStatus';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import './SlotCard.css';

export function SlotCard({ slot, onSelect, showDetails = false }) {
  const isDisabled =
    slot.status === SLOT_STATUS.MAINTENANCE ||
    slot.status === SLOT_STATUS.BOOKED ||
    slot.status === SLOT_STATUS.ACTIVE ||
    slot.status === SLOT_STATUS.OCCUPIED_UNAUTHORIZED ||
    slot.status === SLOT_STATUS.INTRUSION;

  const isIntrusion = slot.status === SLOT_STATUS.INTRUSION;

  const handleClick = () => {
    if (!isDisabled && onSelect) {
      onSelect(slot);
    }
  };

  return (
    <div
      className={`slot-card ${isDisabled ? 'slot-card--disabled' : ''} ${
        isIntrusion ? 'slot-card--intrusion' : ''
      }`}
      style={{
        borderColor: STATUS_COLORS[slot.status],
      }}
      onClick={handleClick}
    >
      <div className="slot-card__header">
        <h3 className="slot-card__id">{slot.id}</h3>
        <StatusBadge status={slot.status} size="small" />
      </div>

      {showDetails && (
        <div className="slot-card__details">
          {slot.userName && (
            <div className="slot-card__detail">
              <span className="slot-card__label">User:</span>
              <span className="slot-card__value">{slot.userName}</span>
            </div>
          )}
          {slot.vehicleNumber && (
            <div className="slot-card__detail">
              <span className="slot-card__label">Kendaraan:</span>
              <span className="slot-card__value">{slot.vehicleNumber}</span>
            </div>
          )}
          {slot.maintenanceReason && (
            <div className="slot-card__detail">
              <span className="slot-card__label">Alasan:</span>
              <span className="slot-card__value">{slot.maintenanceReason}</span>
            </div>
          )}
        </div>
      )}

      {slot.status === SLOT_STATUS.AVAILABLE && (
        <div className="slot-card__indicator slot-card__indicator--available">
          Klik untuk pesan
        </div>
      )}
    </div>
  );
}
