/**
 * Maintenance Management Component
 * Mengelola slot yang perlu maintenance atau perbaikan
 */

import { useState } from 'react';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { Button } from '../../../shared/components/Button/Button';
import './MaintenanceManagement.css';

export function MaintenanceManagement() {
  const { state, dispatch } = useParkingStore();
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [maintenanceReason, setMaintenanceReason] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('sensor');

  // Get available slots for maintenance
  const availableSlots = state.slots.filter(
    (s) => s.status === SLOT_STATUS.AVAILABLE || s.status === SLOT_STATUS.MAINTENANCE
  );

  // Get slots currently in maintenance
  const maintenanceSlots = state.slots.filter((s) => s.status === SLOT_STATUS.MAINTENANCE);

  const maintenanceTypes = [
    { value: 'sensor', label: '🔬 Perbaikan Sensor', icon: '🔬' },
    { value: 'camera', label: '📷 Perbaikan Kamera', icon: '📷' },
    { value: 'barrier', label: '🚧 Perbaikan Barrier', icon: '🚧' },
    { value: 'lighting', label: '💡 Perbaikan Lampu', icon: '💡' },
    { value: 'surface', label: '🛣️ Perbaikan Permukaan', icon: '🛣️' },
    { value: 'iot', label: '📡 Perbaikan IoT Device', icon: '📡' },
    { value: 'cleaning', label: '🧹 Pembersihan', icon: '🧹' },
    { value: 'other', label: '🔧 Lainnya', icon: '🔧' },
  ];

  const handleSetMaintenance = () => {
    if (!selectedSlotId) {
      alert('Pilih slot terlebih dahulu');
      return;
    }

    if (!maintenanceReason.trim()) {
      alert('Alasan maintenance wajib diisi');
      return;
    }

    const selectedType = maintenanceTypes.find((t) => t.value === maintenanceType);
    const fullReason = `${selectedType.icon} ${selectedType.label.split(' ')[1]}: ${maintenanceReason}`;

    dispatch({
      type: ACTION_TYPES.SET_MAINTENANCE,
      payload: {
        slotId: selectedSlotId,
        reason: fullReason,
        maintenanceType: maintenanceType,
      },
    });

    // Reset form
    setSelectedSlotId('');
    setMaintenanceReason('');
    setMaintenanceType('sensor');

    alert(`✅ Slot ${selectedSlotId} telah ditandai untuk maintenance`);
  };

  const handleClearMaintenance = (slotId) => {
    if (confirm(`Yakin maintenance slot ${slotId} sudah selesai?`)) {
      dispatch({
        type: ACTION_TYPES.CLEAR_MAINTENANCE,
        payload: { slotId },
      });
      alert(`✅ Slot ${slotId} kembali tersedia`);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="maintenance-management">
      <div className="maintenance-management__header">
        <h2 className="maintenance-management__title">🔧 Manajemen Maintenance</h2>
        <div className="maintenance-management__stats">
          <span className="maintenance-management__stat maintenance-management__stat--total">
            Total: {maintenanceSlots.length}
          </span>
        </div>
      </div>

      {/* Set Maintenance Form */}
      <div className="maintenance-management__form-section">
        <h3 className="maintenance-management__subtitle">➕ Tandai Slot untuk Maintenance</h3>
        
        <div className="maintenance-management__form">
          <div className="maintenance-management__form-row">
            <div className="maintenance-management__form-group">
              <label className="maintenance-management__label">Pilih Slot *</label>
              <select
                className="maintenance-management__select"
                value={selectedSlotId}
                onChange={(e) => setSelectedSlotId(e.target.value)}
              >
                <option value="">-- Pilih Slot --</option>
                {availableSlots.map((slot) => (
                  <option key={slot.id} value={slot.id} disabled={slot.status === SLOT_STATUS.MAINTENANCE}>
                    {slot.id} {slot.status === SLOT_STATUS.MAINTENANCE ? '(Sudah Maintenance)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="maintenance-management__form-group">
              <label className="maintenance-management__label">Jenis Perbaikan *</label>
              <select
                className="maintenance-management__select"
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value)}
              >
                {maintenanceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="maintenance-management__form-group">
            <label className="maintenance-management__label">Detail Kerusakan/Alasan *</label>
            <textarea
              className="maintenance-management__textarea"
              placeholder="Contoh: Sensor parkir tidak merespon, perlu penggantian komponen"
              value={maintenanceReason}
              onChange={(e) => setMaintenanceReason(e.target.value)}
              rows="3"
            />
          </div>

          <Button variant="warning" onClick={handleSetMaintenance}>
            🔧 Set Maintenance
          </Button>
        </div>
      </div>

      {/* Maintenance List */}
      <div className="maintenance-management__list-section">
        <h3 className="maintenance-management__subtitle">📋 Daftar Slot Maintenance</h3>

        {maintenanceSlots.length === 0 ? (
          <div className="maintenance-management__empty">
            ✅ Tidak ada slot dalam maintenance saat ini
          </div>
        ) : (
          <div className="maintenance-management__list">
            {maintenanceSlots.map((slot) => (
              <div key={slot.id} className="maintenance-management__card">
                <div className="maintenance-management__card-header">
                  <div className="maintenance-management__card-title">
                    <span className="maintenance-management__card-slot">Slot {slot.id}</span>
                    <span className="maintenance-management__card-zone">Zona {slot.zone}</span>
                  </div>
                  <button
                    className="maintenance-management__complete-btn"
                    onClick={() => handleClearMaintenance(slot.id)}
                  >
                    ✅ Selesai
                  </button>
                </div>

                <div className="maintenance-management__card-body">
                  {slot.maintenanceReason && (
                    <div className="maintenance-management__card-reason">
                      <strong>Alasan:</strong> {slot.maintenanceReason}
                    </div>
                  )}
                  
                  <div className="maintenance-management__card-meta">
                    <span>⏰ Dimulai: {formatTime(slot.lastStatusChange)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="maintenance-management__quick-actions">
        <h3 className="maintenance-management__subtitle">⚡ Aksi Cepat</h3>
        <div className="maintenance-management__quick-grid">
          <button
            className="maintenance-management__quick-btn"
            onClick={() => {
              setMaintenanceType('cleaning');
              setMaintenanceReason('Pembersihan rutin harian');
            }}
          >
            🧹 Pembersihan Rutin
          </button>
          <button
            className="maintenance-management__quick-btn"
            onClick={() => {
              setMaintenanceType('sensor');
              setMaintenanceReason('Kalibrasi sensor parkir');
            }}
          >
            🔬 Kalibrasi Sensor
          </button>
          <button
            className="maintenance-management__quick-btn"
            onClick={() => {
              setMaintenanceType('iot');
              setMaintenanceReason('Reset dan update IoT device');
            }}
          >
            📡 Reset IoT
          </button>
        </div>
      </div>
    </div>
  );
}
