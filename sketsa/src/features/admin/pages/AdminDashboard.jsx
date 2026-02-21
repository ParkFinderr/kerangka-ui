/**
 * Admin Dashboard Page
 */

import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { NotificationBanner } from '../../../shared/components/NotificationBanner/NotificationBanner';
import { SlotGrid } from '../../../shared/components/SlotGrid/SlotGrid';
import { useRealtimeSimulation } from '../../../shared/hooks/useRealtimeSimulation';
import { ControlPanel } from '../components/ControlPanel';
import './AdminDashboard.css';

export function AdminDashboard() {
  const { state } = useParkingStore();

  // Enable realtime simulation (optional, bisa diaktifkan/nonaktifkan)
  useRealtimeSimulation({
    enableIntrusionSimulation: false, // Set true untuk auto-simulation
    enableGhostSwapSimulation: false,
    enableUnauthorizedSimulation: false,
    simulationInterval: 20000, // 20 seconds
  });

  // Calculate comprehensive statistics
  const availableCount = state.slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE).length;
  const bookedCount = state.slots.filter((s) => s.status === SLOT_STATUS.BOOKED).length;
  const activeCount = state.slots.filter((s) => s.status === SLOT_STATUS.ACTIVE).length;
  const completedCount = state.slots.filter((s) => s.status === SLOT_STATUS.COMPLETED).length;
  const maintenanceCount = state.slots.filter((s) => s.status === SLOT_STATUS.MAINTENANCE).length;
  const unauthorizedCount = state.slots.filter(
    (s) => s.status === SLOT_STATUS.OCCUPIED_UNAUTHORIZED
  ).length;
  const intrusionCount = state.slots.filter((s) => s.status === SLOT_STATUS.INTRUSION).length;

  const totalSlots = state.slots.length;
  const criticalIssues = intrusionCount + unauthorizedCount;

  return (
    <div className="admin-dashboard">
      <NotificationBanner notifications={state.notifications} />

      {/* Alert Banner for Critical Issues */}
      {criticalIssues > 0 && (
        <div className="admin-dashboard__critical-alert">
          ⚠️ PERHATIAN: {criticalIssues} masalah kritis memerlukan tindakan segera!
        </div>
      )}

      {/* Statistics Grid */}
      <div className="admin-dashboard__stats-grid">
        <div className="admin-stat-card admin-stat-card--available">
          <div className="admin-stat-card__icon">✅</div>
          <div className="admin-stat-card__value">{availableCount}</div>
          <div className="admin-stat-card__label">Tersedia</div>
        </div>

        <div className="admin-stat-card admin-stat-card--booked">
          <div className="admin-stat-card__icon">📅</div>
          <div className="admin-stat-card__value">{bookedCount}</div>
          <div className="admin-stat-card__label">Dipesan</div>
        </div>

        <div className="admin-stat-card admin-stat-card--active">
          <div className="admin-stat-card__icon">🚗</div>
          <div className="admin-stat-card__value">{activeCount}</div>
          <div className="admin-stat-card__label">Aktif</div>
        </div>

        <div className="admin-stat-card admin-stat-card--maintenance">
          <div className="admin-stat-card__icon">🔧</div>
          <div className="admin-stat-card__value">{maintenanceCount}</div>
          <div className="admin-stat-card__label">Maintenance</div>
        </div>

        <div className="admin-stat-card admin-stat-card--intrusion">
          <div className="admin-stat-card__icon">🚨</div>
          <div className="admin-stat-card__value">{intrusionCount}</div>
          <div className="admin-stat-card__label">Intrusi</div>
        </div>

        <div className="admin-stat-card admin-stat-card--unauthorized">
          <div className="admin-stat-card__icon">⚠️</div>
          <div className="admin-stat-card__value">{unauthorizedCount}</div>
          <div className="admin-stat-card__label">Parkir Liar</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="admin-dashboard__section">
        <ControlPanel />
      </div>

      {/* Slot Grid */}
      <div className="admin-dashboard__section">
        <h2 className="admin-dashboard__title">Semua Slot Parking</h2>
        <SlotGrid slots={state.slots} showDetails={true} onSlotSelect={null} />
      </div>

      {/* System Info */}
      <div className="admin-dashboard__system-info">
        <h3>Informasi Sistem</h3>
        <div className="admin-dashboard__system-stats">
          <div className="system-stat">
            <span className="system-stat__label">Total Slot:</span>
            <span className="system-stat__value">{totalSlots}</span>
          </div>
          <div className="system-stat">
            <span className="system-stat__label">Notifikasi Aktif:</span>
            <span className="system-stat__value">{state.notifications.length}</span>
          </div>
          <div className="system-stat">
            <span className="system-stat__label">Masalah Kritis:</span>
            <span className="system-stat__value system-stat__value--critical">
              {criticalIssues}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
