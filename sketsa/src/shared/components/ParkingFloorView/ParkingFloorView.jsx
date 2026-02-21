/**
 * Parking Floor View Component
 * Displays parking slots in a visual floor plan layout with left/right rows and center aisle
 */

import { useState } from 'react';
import { SlotCard } from '../SlotCard/SlotCard';
import './ParkingFloorView.css';

export function ParkingFloorView({ slots = [], onSlotSelect, showDetails = false }) {
  // Group slots by floor
  const slotsByFloor = slots.reduce((acc, slot) => {
    const floor = slot.floor || 1;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(slot);
    return acc;
  }, {});

  const floors = Object.keys(slotsByFloor).sort((a, b) => a - b);
  const [activeFloor, setActiveFloor] = useState(floors[0]);

  // Get floor stats
  const getFloorStats = (floorSlots) => {
    return {
      total: floorSlots.length,
      available: floorSlots.filter(s => s.status === 'AVAILABLE').length,
      occupied: floorSlots.filter(s => s.status === 'ACTIVE' || s.status === 'BOOKED').length,
      maintenance: floorSlots.filter(s => s.status === 'MAINTENANCE').length,
      issues: floorSlots.filter(s => s.status === 'INTRUSION' || s.status === 'OCCUPIED_UNAUTHORIZED').length,
    };
  };

  // Organize slots into left and right rows for floor plan layout
  const organizeSlotsForFloorPlan = (floorSlots) => {
    const zones = [...new Set(floorSlots.map(s => s.zone))].sort();
    
    // Assume first zone is left row, second zone is right row
    const leftZone = zones[0];
    const rightZone = zones[1];
    
    const leftSlots = floorSlots
      .filter(s => s.zone === leftZone)
      .sort((a, b) => a.position - b.position);
    
    const rightSlots = floorSlots
      .filter(s => s.zone === rightZone)
      .sort((a, b) => a.position - b.position);
    
    return {
      leftZone,
      rightZone,
      leftSlots,
      rightSlots,
      maxRows: Math.max(leftSlots.length, rightSlots.length)
    };
  };

  if (floors.length === 0) {
    return (
      <div className="parking-floor-view__empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p>Tidak ada slot parkir tersedia</p>
      </div>
    );
  }

  return (
    <div className="parking-floor-view">
      {/* Floor Navigation */}
      <div className="parking-floor-view__nav">
        <div className="parking-floor-view__tabs">
          {floors.map((floor) => {
            const stats = getFloorStats(slotsByFloor[floor]);
            const isActive = floor === activeFloor;
            
            return (
              <button
                key={floor}
                className={`parking-floor-view__tab ${isActive ? 'parking-floor-view__tab--active' : ''}`}
                onClick={() => setActiveFloor(floor)}
              >
                <div className="parking-floor-view__tab-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="parking-floor-view__tab-content">
                  <div className="parking-floor-view__tab-title">Lantai {floor}</div>
                  <div className="parking-floor-view__tab-stats">
                    <span className="parking-floor-view__stat parking-floor-view__stat--available">
                      {stats.available}
                    </span>
                    <span className="parking-floor-view__stat-separator">/</span>
                    <span className="parking-floor-view__stat parking-floor-view__stat--total">
                      {stats.total}
                    </span>
                  </div>
                </div>
                {stats.issues > 0 && (
                  <div className="parking-floor-view__tab-alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floor Content */}
      <div className="parking-floor-view__content">
        {floors.map((floor) => {
          const floorPlan = organizeSlotsForFloorPlan(slotsByFloor[floor]);
          const stats = getFloorStats(slotsByFloor[floor]);
          const floorClass = `parking-floor-view__floor parking-floor-view__floor--level-${floor}`;
          
          return (
            <div
              key={floor}
              className={`${floorClass} ${floor === activeFloor ? 'parking-floor-view__floor--active' : ''}`}
            >
              {/* Floor Header with Visual Indicator */}
              <div className="parking-floor-view__floor-header">
                <div className="parking-floor-view__floor-title">
                  <div className="parking-floor-view__floor-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <h3>Lantai {floor}</h3>
                  <div className={`parking-floor-view__floor-indicator parking-floor-view__floor-indicator--${floor}`}>
                    {floor === '1' ? '1F' : '2F'}
                  </div>
                </div>
                <div className="parking-floor-view__floor-summary">
                  <div className="parking-floor-view__summary-item parking-floor-view__summary-item--available">
                    <span className="parking-floor-view__summary-label">Tersedia</span>
                    <span className="parking-floor-view__summary-value">{stats.available}</span>
                  </div>
                  <div className="parking-floor-view__summary-item parking-floor-view__summary-item--occupied">
                    <span className="parking-floor-view__summary-label">Terisi</span>
                    <span className="parking-floor-view__summary-value">{stats.occupied}</span>
                  </div>
                  {stats.maintenance > 0 && (
                    <div className="parking-floor-view__summary-item parking-floor-view__summary-item--maintenance">
                      <span className="parking-floor-view__summary-label">Maintenance</span>
                      <span className="parking-floor-view__summary-value">{stats.maintenance}</span>
                    </div>
                  )}
                  {stats.issues > 0 && (
                    <div className="parking-floor-view__summary-item parking-floor-view__summary-item--alert">
                      <span className="parking-floor-view__summary-label">Peringatan</span>
                      <span className="parking-floor-view__summary-value">{stats.issues}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floor Plan - Denah Parkir */}
              <div className="parking-floor-view__floor-plan">
                {/* Entrance/Exit Indicator */}
                <div className="parking-floor-view__entrance">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>PINTU MASUK</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>

                {/* Parking Layout: Left Row | Aisle | Right Row */}
                <div className="parking-floor-view__layout">
                  {/* Left Row (Zone A or C) */}
                  <div className="parking-floor-view__row parking-floor-view__row--left">
                    <div className="parking-floor-view__row-header">
                      <div className="parking-floor-view__row-label">
                        <div className="parking-floor-view__row-badge">Zona {floorPlan.leftZone}</div>
                        <div className="parking-floor-view__row-direction">← BARISAN KIRI</div>
                      </div>
                    </div>
                    <div className="parking-floor-view__row-slots">
                      {floorPlan.leftSlots.map((slot) => (
                        <div key={slot.id} className="parking-floor-view__slot-wrapper">
                          <SlotCard
                            slot={slot}
                            onSelect={onSlotSelect}
                            showDetails={showDetails}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center Aisle - Lorong */}
                  <div className="parking-floor-view__aisle">
                    <div className="parking-floor-view__aisle-marking">
                      {Array.from({ length: floorPlan.maxRows }).map((_, i) => (
                        <div key={i} className="parking-floor-view__aisle-line" />
                      ))}
                    </div>
                    <div className="parking-floor-view__aisle-label">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="18 8 22 12 18 16" />
                        <polyline points="6 8 2 12 6 16" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                      <span>LORONG</span>
                    </div>
                  </div>

                  {/* Right Row (Zone B or D) */}
                  <div className="parking-floor-view__row parking-floor-view__row--right">
                    <div className="parking-floor-view__row-header">
                      <div className="parking-floor-view__row-label">
                        <div className="parking-floor-view__row-direction">BARISAN KANAN →</div>
                        <div className="parking-floor-view__row-badge">Zona {floorPlan.rightZone}</div>
                      </div>
                    </div>
                    <div className="parking-floor-view__row-slots">
                      {floorPlan.rightSlots.map((slot) => (
                        <div key={slot.id} className="parking-floor-view__slot-wrapper">
                          <SlotCard
                            slot={slot}
                            onSelect={onSlotSelect}
                            showDetails={showDetails}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exit Indicator */}
                <div className="parking-floor-view__exit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>PINTU KELUAR</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
