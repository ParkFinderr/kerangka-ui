/**
 * Quick Access Dashboard Page
 */

import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { NotificationBanner } from '../../../shared/components/NotificationBanner/NotificationBanner';
import { SlotGrid } from '../../../shared/components/SlotGrid/SlotGrid';
import './QuickDashboard.css';

export function QuickDashboard() {
  const { state } = useParkingStore();

  // Calculate statistics
  const availableCount = state.slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE).length;
  const bookedCount = state.slots.filter((s) => s.status === SLOT_STATUS.BOOKED).length;
  const activeCount = state.slots.filter((s) => s.status === SLOT_STATUS.ACTIVE).length;
  const maintenanceCount = state.slots.filter((s) => s.status === SLOT_STATUS.MAINTENANCE).length;
  const unauthorizedCount = state.slots.filter(
    (s) => s.status === SLOT_STATUS.OCCUPIED_UNAUTHORIZED
  ).length;
  const intrusionCount = state.slots.filter((s) => s.status === SLOT_STATUS.INTRUSION).length;

  const totalSlots = state.slots.length;
  const occupiedSlots = bookedCount + activeCount;

  // Check for critical alerts
  const hasCriticalAlert = intrusionCount > 0 || unauthorizedCount > 0;

  return (
    <div className="quick-dashboard">
      <NotificationBanner notifications={state.notifications} />

      {/* Critical Alerts */}
      {hasCriticalAlert && (
        <div className="quick-dashboard__alerts">
          {intrusionCount > 0 && (
            <div className="quick-dashboard__alert quick-dashboard__alert--critical">
              🚨 INTRUSI TERDETEKSI: {intrusionCount} slot
            </div>
          )}
          {unauthorizedCount > 0 && (
            <div className="quick-dashboard__alert quick-dashboard__alert--warning">
              ⚠️ PARKIR LIAR: {unauthorizedCount} slot
            </div>
          )}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="quick-dashboard__stats">
        <div className="stat-card stat-card--available">
          <div className="stat-card__value">{availableCount}</div>
          <div className="stat-card__label">Tersedia</div>
        </div>

        <div className="stat-card stat-card--occupied">
          <div className="stat-card__value">{occupiedSlots}</div>
          <div className="stat-card__label">Terisi</div>
        </div>

        <div className="stat-card stat-card--total">
          <div className="stat-card__value">{totalSlots}</div>
          <div className="stat-card__label">Total Slot</div>
        </div>

        <div className="stat-card stat-card--maintenance">
          <div className="stat-card__value">{maintenanceCount}</div>
          <div className="stat-card__label">Maintenance</div>
        </div>
      </div>

      {/* Occupancy Bar */}
      <div className="quick-dashboard__occupancy">
        <div className="quick-dashboard__occupancy-header">
          <span>Tingkat Okupansi</span>
          <span className="quick-dashboard__occupancy-percentage">
            {Math.round((occupiedSlots / totalSlots) * 100)}%
          </span>
        </div>
        <div className="quick-dashboard__occupancy-bar">
          <div
            className="quick-dashboard__occupancy-fill"
            style={{ width: `${(occupiedSlots / totalSlots) * 100}%` }}
          />
        </div>
      </div>

      {/* Slot Grid */}
      <div className="quick-dashboard__section">
        <h2 className="quick-dashboard__title">Status Slot Parking</h2>
        <SlotGrid slots={state.slots} showDetails={true} onSlotSelect={null} />
      </div>

      {/* Legend */}
      <div className="quick-dashboard__legend">
        <h3>Keterangan Status:</h3>
        <div className="quick-dashboard__legend-items">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#10b981' }}></span>
            <span>Tersedia</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
            <span>Dipesan</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#3b82f6' }}></span>
            <span>Aktif</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#ef4444' }}></span>
            <span>Parkir Liar</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot--blink" style={{ background: '#dc2626' }}></span>
            <span>Intrusi</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#6b7280' }}></span>
            <span>Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
