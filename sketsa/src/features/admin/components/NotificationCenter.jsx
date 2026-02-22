/**
 * Notification Center Component
 * Menampilkan notifikasi parkir liar dan ghost swap dengan kontrol buzzer IoT
 */

import { useState } from 'react';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { Button } from '../../../shared/components/Button/Button';
import './NotificationCenter.css';

export function NotificationCenter() {
  const { state, dispatch } = useParkingStore();
  const [buzzerStatus, setBuzzerStatus] = useState({});
  const [autoResolve, setAutoResolve] = useState(false);

  // Get slots with issues
  const unauthorizedSlots = state.slots.filter(
    (s) => s.status === SLOT_STATUS.OCCUPIED_UNAUTHORIZED
  );
  const intrusionSlots = state.slots.filter((s) => s.status === SLOT_STATUS.INTRUSION);

  const totalAlerts = unauthorizedSlots.length + intrusionSlots.length;

  const handleActivateBuzzer = (slotId, issueType) => {
    setBuzzerStatus({ ...buzzerStatus, [slotId]: true });
    
    // Simulate IoT buzzer activation
    console.log(`🔊 Buzzer AKTIF untuk slot ${slotId} - ${issueType}`);
    
    // Auto deactivate after 5 seconds (simulation)
    setTimeout(() => {
      setBuzzerStatus((prev) => ({ ...prev, [slotId]: false }));
      console.log(`🔇 Buzzer OFF untuk slot ${slotId}`);
    }, 5000);

    alert(`🔊 Buzzer IoT diaktifkan untuk slot ${slotId}!\n\nBuzzer akan berbunyi selama 5 detik.`);
  };

  const handleResolveUnauthorized = (slotId) => {
    if (confirm(`Tandai parkir liar di slot ${slotId} sebagai terselesaikan?`)) {
      dispatch({
        type: ACTION_TYPES.CLEAR_UNAUTHORIZED,
        payload: { slotId },
      });
      alert(`✅ Parkir liar di slot ${slotId} telah diselesaikan`);
    }
  };

  const handleResolveIntrusion = (slotId) => {
    if (confirm(`Tandai intrusi di slot ${slotId} sebagai terselesaikan?`)) {
      dispatch({
        type: ACTION_TYPES.FORCE_COMPLETE,
        payload: { slotId },
      });
      alert(`✅ Intrusi di slot ${slotId} telah diselesaikan`);
    }
  };

  const handleResolveAll = () => {
    if (confirm(`Yakin ingin menyelesaikan SEMUA ${totalAlerts} notifikasi?`)) {
      // Resolve all unauthorized
      unauthorizedSlots.forEach((slot) => {
        dispatch({
          type: ACTION_TYPES.CLEAR_UNAUTHORIZED,
          payload: { slotId: slot.id },
        });
      });

      // Resolve all intrusions
      intrusionSlots.forEach((slot) => {
        dispatch({
          type: ACTION_TYPES.FORCE_COMPLETE,
          payload: { slotId: slot.id },
        });
      });

      alert(`✅ Semua notifikasi telah diselesaikan`);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="notification-center">
      <div className="notification-center__header">
        <div className="notification-center__title-wrapper">
          <h2 className="notification-center__title">🔔 Pusat Notifikasi</h2>
          {totalAlerts > 0 && (
            <span className="notification-center__badge">{totalAlerts}</span>
          )}
        </div>
        {totalAlerts > 0 && (
          <Button variant="success" onClick={handleResolveAll}>
            ✅ Selesaikan Semua
          </Button>
        )}
      </div>

      {/* Auto Resolve Toggle */}
      <div className="notification-center__controls">
        <label className="notification-center__toggle">
          <input
            type="checkbox"
            checked={autoResolve}
            onChange={(e) => setAutoResolve(e.target.checked)}
          />
          <span>🤖 Auto-resolve (eksperimental)</span>
        </label>
        <p className="notification-center__info">
          ℹ️ Notifikasi akan otomatis diselesaikan setelah buzzer diaktifkan
        </p>
      </div>

      {/* Parkir Liar Section */}
      <div className="notification-center__section">
        <div className="notification-center__section-header">
          <h3 className="notification-center__subtitle">
            ⚠️ Parkir Liar ({unauthorizedSlots.length})
          </h3>
        </div>

        {unauthorizedSlots.length === 0 ? (
          <div className="notification-center__empty">
            ✅ Tidak ada parkir liar saat ini
          </div>
        ) : (
          <div className="notification-center__list">
            {unauthorizedSlots.map((slot) => (
              <div key={slot.id} className="notification-center__item notification-center__item--unauthorized">
                <div className="notification-center__item-icon">⚠️</div>
                <div className="notification-center__item-content">
                  <div className="notification-center__item-title">
                    Slot {slot.id} - Parkir Tidak Terautorasi
                  </div>
                  <div className="notification-center__item-details">
                    <span>📍 Zona {slot.zone}</span>
                    <span>⏰ {formatTime(slot.lastStatusChange)}</span>
                  </div>
                  {slot.unauthorizedVehicle && (
                    <div className="notification-center__item-vehicle">
                      🚗 Plat: {slot.unauthorizedVehicle}
                    </div>
                  )}
                </div>
                <div className="notification-center__item-actions">
                  <button
                    className={`notification-center__buzzer-btn ${
                      buzzerStatus[slot.id] ? 'notification-center__buzzer-btn--active' : ''
                    }`}
                    onClick={() => handleActivateBuzzer(slot.id, 'Parkir Liar')}
                    disabled={buzzerStatus[slot.id]}
                  >
                    {buzzerStatus[slot.id] ? '🔊 Buzzer ON' : '🔔 Aktifkan Buzzer'}
                  </button>
                  <button
                    className="notification-center__resolve-btn"
                    onClick={() => handleResolveUnauthorized(slot.id)}
                  >
                    ✅ Selesai
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ghost Swap / Intrusion Section */}
      <div className="notification-center__section">
        <div className="notification-center__section-header">
          <h3 className="notification-center__subtitle">
            🚨 Ghost Swap / Intrusi ({intrusionSlots.length})
          </h3>
        </div>

        {intrusionSlots.length === 0 ? (
          <div className="notification-center__empty">
            ✅ Tidak ada ghost swap saat ini
          </div>
        ) : (
          <div className="notification-center__list">
            {intrusionSlots.map((slot) => (
              <div key={slot.id} className="notification-center__item notification-center__item--intrusion">
                <div className="notification-center__item-icon">🚨</div>
                <div className="notification-center__item-content">
                  <div className="notification-center__item-title">
                    Slot {slot.id} - Kendaraan Tidak Sesuai
                  </div>
                  <div className="notification-center__item-details">
                    <span>📍 Zona {slot.zone}</span>
                    <span>⏰ {formatTime(slot.lastStatusChange)}</span>
                  </div>
                  {slot.bookedBy && (
                    <div className="notification-center__item-booking">
                      📋 Dipesan oleh: {slot.bookedBy.userId}
                      <br />
                      🚗 Plat terdaftar: {slot.bookedBy.vehicleNumber}
                    </div>
                  )}
                  {slot.detectedVehicle && (
                    <div className="notification-center__item-detected">
                      🚨 Plat terdeteksi: {slot.detectedVehicle}
                    </div>
                  )}
                </div>
                <div className="notification-center__item-actions">
                  <button
                    className={`notification-center__buzzer-btn ${
                      buzzerStatus[slot.id] ? 'notification-center__buzzer-btn--active' : ''
                    }`}
                    onClick={() => handleActivateBuzzer(slot.id, 'Ghost Swap')}
                    disabled={buzzerStatus[slot.id]}
                  >
                    {buzzerStatus[slot.id] ? '🔊 Buzzer ON' : '🔔 Aktifkan Buzzer'}
                  </button>
                  <button
                    className="notification-center__resolve-btn"
                    onClick={() => handleResolveIntrusion(slot.id)}
                  >
                    ✅ Selesai
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {totalAlerts === 0 && (
        <div className="notification-center__all-clear">
          ✨ Semua notifikasi telah diselesaikan! Sistem parkir berjalan normal.
        </div>
      )}
    </div>
  );
}
