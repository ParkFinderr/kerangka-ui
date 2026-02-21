/**
 * Slot Card Component - Enhanced with 3D Parking Slot Visual
 */

import { SLOT_STATUS } from '../../../core/constants/slotStatus';
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
  const isAvailable = slot.status === SLOT_STATUS.AVAILABLE;
  const isOccupied = slot.status === SLOT_STATUS.ACTIVE || 
                     slot.status === SLOT_STATUS.BOOKED ||
                     slot.status === SLOT_STATUS.OCCUPIED_UNAUTHORIZED;

  const handleClick = () => {
    if (!isDisabled && onSelect) {
      onSelect(slot);
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    switch(slot.status) {
      case SLOT_STATUS.AVAILABLE:
        return (
          <svg className="slot-card__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        );
      case SLOT_STATUS.MAINTENANCE:
        return (
          <svg className="slot-card__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        );
      case SLOT_STATUS.INTRUSION:
        return (
          <svg className="slot-card__status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`slot-card ${isDisabled ? 'slot-card--disabled' : ''} ${
        isIntrusion ? 'slot-card--intrusion' : ''
      } ${isAvailable ? 'slot-card--available' : ''}`}
      onClick={handleClick}
      data-status={slot.status}
    >
      {/* 3D Parking Slot Container */}
      <div className="slot-card__container">
        {/* Parking Lines */}
        <div className="slot-card__lines">
          <div className="slot-card__line slot-card__line--left"></div>
          <div className="slot-card__line slot-card__line--right"></div>
        </div>

        {/* Car Icon or Empty Indicator */}
        <div className="slot-card__vehicle-area">
          {isOccupied && (
            <div className="slot-card__car">
              <svg viewBox="0 0 64 32" fill="currentColor">
                {/* Car Body */}
                <path d="M10 18 L10 12 L14 8 L20 8 L24 6 L40 6 L44 8 L50 8 L54 12 L54 18 Z" />
                {/* Windshield */}
                <path d="M14 12 L20 10 L24 10 L24 12 Z" opacity="0.3" />
                <path d="M40 10 L44 10 L50 12 L40 12 Z" opacity="0.3" />
                {/* Wheels */}
                <circle cx="16" cy="20" r="4" fill="#2d3748"/>
                <circle cx="48" cy="20" r="4" fill="#2d3748"/>
                <circle cx="16" cy="20" r="2" fill="#4a5568"/>
                <circle cx="48" cy="20" r="2" fill="#4a5568"/>
                {/* Bottom Shadow */}
                <ellipse cx="32" cy="24" rx="20" ry="2" opacity="0.2"/>
              </svg>
            </div>
          )}
          {isAvailable && (
            <div className="slot-card__empty-indicator">
              {getStatusIcon()}
            </div>
          )}
          {slot.status === SLOT_STATUS.MAINTENANCE && (
            <div className="slot-card__maintenance-indicator">
              {getStatusIcon()}
            </div>
          )}
          {isIntrusion && (
            <div className="slot-card__alert-indicator">
              {getStatusIcon()}
            </div>
          )}
        </div>

        {/* Slot ID Badge */}
        <div className="slot-card__id-badge">
          <span className="slot-card__id">{slot.id}</span>
        </div>

        {/* Status Badge */}
        <div className="slot-card__status-badge">
          <StatusBadge status={slot.status} size="small" />
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className="slot-card__details">
          {slot.userName && (
            <div className="slot-card__detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="slot-card__value">{slot.userName}</span>
            </div>
          )}
          {slot.vehicleNumber && (
            <div className="slot-card__detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <span className="slot-card__value">{slot.vehicleNumber}</span>
            </div>
          )}
          {slot.maintenanceReason && (
            <div className="slot-card__detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span className="slot-card__value">{slot.maintenanceReason}</span>
            </div>
          )}
        </div>
      )}

      {/* Hover Indicator */}
      {isAvailable && (
        <div className="slot-card__hover-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 16 16 12 12 8"></polyline>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span>Klik untuk booking</span>
        </div>
      )}
    </div>
  );
}
