/**
 * Admin Control Panel Component
 */

import { useState } from 'react';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { Button } from '../../../shared/components/Button/Button';
import './ControlPanel.css';

export function ControlPanel() {
  const { state, dispatch } = useParkingStore();
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [maintenanceReason, setMaintenanceReason] = useState('');

  const handleSimulateIntrusion = () => {
    const bookedSlots = state.slots.filter((s) => s.status === SLOT_STATUS.BOOKED);
    if (bookedSlots.length === 0) {
      alert('Tidak ada slot yang BOOKED untuk simulasi intrusi');
      return;
    }

    const randomSlot = bookedSlots[Math.floor(Math.random() * bookedSlots.length)];
    dispatch({
      type: ACTION_TYPES.INTRUSION_DETECTED,
      payload: { slotId: randomSlot.id },
    });
  };

  const handleSimulateGhostSwap = () => {
    const activeSlots = state.slots.filter((s) => s.status === SLOT_STATUS.ACTIVE);
    if (activeSlots.length === 0) {
      alert('Tidak ada slot yang ACTIVE untuk simulasi ghost swap');
      return;
    }

    const randomSlot = activeSlots[Math.floor(Math.random() * activeSlots.length)];
    dispatch({
      type: ACTION_TYPES.GHOST_SWAP,
      payload: { slotId: randomSlot.id },
    });
  };

  const handleSimulateUnauthorized = () => {
    const availableSlots = state.slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE);
    if (availableSlots.length === 0) {
      alert('Tidak ada slot yang AVAILABLE untuk simulasi parkir liar');
      return;
    }

    const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
    dispatch({
      type: ACTION_TYPES.UNAUTHORIZED_OCCUPIED,
      payload: { slotId: randomSlot.id },
    });
  };

  const handleSetMaintenance = () => {
    if (!selectedSlotId) {
      alert('Pilih slot terlebih dahulu');
      return;
    }

    dispatch({
      type: ACTION_TYPES.SET_MAINTENANCE,
      payload: {
        slotId: selectedSlotId,
        reason: maintenanceReason || 'Maintenance rutin',
      },
    });

    setSelectedSlotId('');
    setMaintenanceReason('');
  };

  const handleClearMaintenance = () => {
    if (!selectedSlotId) {
      alert('Pilih slot terlebih dahulu');
      return;
    }

    dispatch({
      type: ACTION_TYPES.CLEAR_MAINTENANCE,
      payload: { slotId: selectedSlotId },
    });

    setSelectedSlotId('');
  };

  const handleForceComplete = () => {
    if (!selectedSlotId) {
      alert('Pilih slot terlebih dahulu');
      return;
    }

    if (
      confirm(`Yakin ingin force complete slot ${selectedSlotId}? Ini akan mereset slot ke AVAILABLE.`)
    ) {
      dispatch({
        type: ACTION_TYPES.FORCE_COMPLETE,
        payload: { slotId: selectedSlotId },
      });

      setSelectedSlotId('');
    }
  };

  const handleClearUnauthorized = () => {
    if (!selectedSlotId) {
      alert('Pilih slot terlebih dahulu');
      return;
    }

    dispatch({
      type: ACTION_TYPES.CLEAR_UNAUTHORIZED,
      payload: { slotId: selectedSlotId },
    });

    setSelectedSlotId('');
  };

  return (
    <div className="control-panel">
      <h2 className="control-panel__title">Control Panel Admin</h2>

      {/* Simulation Controls */}
      <div className="control-panel__section">
        <h3 className="control-panel__subtitle">Simulasi Event (Random Slot)</h3>
        <div className="control-panel__buttons">
          <Button variant="danger" onClick={handleSimulateIntrusion}>
            🚨 Simulate Intrusion
          </Button>
          <Button variant="warning" onClick={handleSimulateGhostSwap}>
            🔄 Simulate Ghost Swap
          </Button>
          <Button variant="danger" onClick={handleSimulateUnauthorized}>
            ⚠️ Simulate Parkir Liar
          </Button>
        </div>
      </div>

      {/* Slot-Specific Controls */}
      <div className="control-panel__section">
        <h3 className="control-panel__subtitle">Kontrol Slot Spesifik</h3>

        <div className="control-panel__form">
          <div className="control-panel__form-group">
            <label htmlFor="slot-select" className="control-panel__label">
              Pilih Slot:
            </label>
            <select
              id="slot-select"
              className="control-panel__select"
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
            >
              <option value="">-- Pilih Slot --</option>
              {state.slots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.id} - {slot.status}
                </option>
              ))}
            </select>
          </div>

          {selectedSlotId && (
            <div className="control-panel__selected-info">
              <strong>Slot dipilih:</strong> {selectedSlotId} -{' '}
              {state.slots.find((s) => s.id === selectedSlotId)?.status}
            </div>
          )}
        </div>

        <div className="control-panel__buttons">
          <Button
            variant="secondary"
            onClick={handleSetMaintenance}
            disabled={!selectedSlotId}
          >
            🔧 Set Maintenance
          </Button>
          <Button
            variant="success"
            onClick={handleClearMaintenance}
            disabled={!selectedSlotId}
          >
            ✅ Clear Maintenance
          </Button>
          <Button
            variant="danger"
            onClick={handleForceComplete}
            disabled={!selectedSlotId}
          >
            ⚡ Force Complete
          </Button>
          <Button
            variant="warning"
            onClick={handleClearUnauthorized}
            disabled={!selectedSlotId}
          >
            🧹 Clear Unauthorized
          </Button>
        </div>

        <div className="control-panel__form-group">
          <label htmlFor="maintenance-reason" className="control-panel__label">
            Alasan Maintenance (opsional):
          </label>
          <input
            id="maintenance-reason"
            type="text"
            className="control-panel__input"
            placeholder="Contoh: Perbaikan sensor"
            value={maintenanceReason}
            onChange={(e) => setMaintenanceReason(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
