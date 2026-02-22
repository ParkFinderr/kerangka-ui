/**
 * Slot Management Component
 * Mengelola data slot parkir (CRUD operations)
 */

import { useState } from 'react';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { Button } from '../../../shared/components/Button/Button';
import './SlotManagement.css';

export function SlotManagement() {
  const { state, dispatch } = useParkingStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSlot, setNewSlot] = useState({
    zone: 'A',
    position: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter slots berdasarkan pencarian
  const filteredSlots = state.slots.filter((slot) =>
    slot.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSlot = () => {
    if (!newSlot.position) {
      alert('Posisi slot wajib diisi');
      return;
    }

    const slotId = `${newSlot.zone}-${newSlot.position}`;
    
    // Check if slot already exists
    if (state.slots.find((s) => s.id === slotId)) {
      alert(`Slot ${slotId} sudah ada!`);
      return;
    }

    dispatch({
      type: ACTION_TYPES.ADD_SLOT,
      payload: {
        id: slotId,
        zone: newSlot.zone,
        position: newSlot.position,
        status: SLOT_STATUS.AVAILABLE,
      },
    });

    // Reset form
    setNewSlot({ zone: 'A', position: '' });
    setShowAddForm(false);
    alert(`Slot ${slotId} berhasil ditambahkan!`);
  };

  const handleDeleteSlot = (slotId) => {
    const slot = state.slots.find((s) => s.id === slotId);
    
    // Prevent deletion if slot is active
    if (slot.status === SLOT_STATUS.ACTIVE || slot.status === SLOT_STATUS.BOOKED) {
      alert(`Tidak dapat menghapus slot ${slotId} karena sedang ${slot.status}`);
      return;
    }

    if (confirm(`Yakin ingin menghapus slot ${slotId}?`)) {
      dispatch({
        type: ACTION_TYPES.REMOVE_SLOT,
        payload: { slotId },
      });
      alert(`Slot ${slotId} berhasil dihapus!`);
    }
  };

  const handleToggleBlock = (slotId) => {
    const slot = state.slots.find((s) => s.id === slotId);
    
    if (slot.status === SLOT_STATUS.ACTIVE || slot.status === SLOT_STATUS.BOOKED) {
      alert(`Tidak dapat memblokir slot ${slotId} karena sedang digunakan`);
      return;
    }

    if (slot.status === SLOT_STATUS.MAINTENANCE) {
      // Unblock
      dispatch({
        type: ACTION_TYPES.CLEAR_MAINTENANCE,
        payload: { slotId },
      });
    } else {
      // Block
      dispatch({
        type: ACTION_TYPES.SET_MAINTENANCE,
        payload: {
          slotId,
          reason: 'Diblokir oleh admin',
        },
      });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case SLOT_STATUS.AVAILABLE:
        return 'slot-badge--available';
      case SLOT_STATUS.BOOKED:
        return 'slot-badge--booked';
      case SLOT_STATUS.ACTIVE:
        return 'slot-badge--active';
      case SLOT_STATUS.MAINTENANCE:
        return 'slot-badge--maintenance';
      default:
        return '';
    }
  };

  return (
    <div className="slot-management">
      <div className="slot-management__header">
        <h2 className="slot-management__title">🅿️ Kelola Slot Parkir</h2>
        <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '✖ Batal' : '➕ Tambah Slot'}
        </Button>
      </div>

      {/* Add Slot Form */}
      {showAddForm && (
        <div className="slot-management__add-form">
          <h3 className="slot-management__form-title">Tambah Slot Baru</h3>
          <div className="slot-management__form-row">
            <div className="slot-management__form-group">
              <label className="slot-management__label">Zona</label>
              <select
                className="slot-management__select"
                value={newSlot.zone}
                onChange={(e) => setNewSlot({ ...newSlot, zone: e.target.value })}
              >
                <option value="A">Zona A</option>
                <option value="B">Zona B</option>
                <option value="C">Zona C</option>
              </select>
            </div>
            <div className="slot-management__form-group">
              <label className="slot-management__label">Posisi (Nomor)</label>
              <input
                type="number"
                className="slot-management__input"
                placeholder="Contoh: 1, 2, 3"
                value={newSlot.position}
                onChange={(e) => setNewSlot({ ...newSlot, position: e.target.value })}
                min="1"
              />
            </div>
            <div className="slot-management__form-group">
              <label className="slot-management__label">Preview</label>
              <div className="slot-management__preview">
                {newSlot.zone}-{newSlot.position || '?'}
              </div>
            </div>
          </div>
          <Button variant="success" onClick={handleAddSlot}>
            💾 Simpan Slot
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="slot-management__search">
        <input
          type="text"
          className="slot-management__search-input"
          placeholder="🔍 Cari slot (contoh: A-1)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="slot-management__count">
          Total: {filteredSlots.length} slot
        </span>
      </div>

      {/* Slot List */}
      <div className="slot-management__list">
        {filteredSlots.length === 0 ? (
          <div className="slot-management__empty">
            {searchTerm ? '❌ Slot tidak ditemukan' : '📭 Belum ada slot'}
          </div>
        ) : (
          filteredSlots.map((slot) => (
            <div key={slot.id} className="slot-management__item">
              <div className="slot-management__item-info">
                <div className="slot-management__item-id">{slot.id}</div>
                <div className={`slot-management__item-status slot-badge ${getStatusBadgeClass(slot.status)}`}>
                  {slot.status}
                </div>
                {slot.maintenanceReason && (
                  <div className="slot-management__item-note">
                    📝 {slot.maintenanceReason}
                  </div>
                )}
              </div>
              <div className="slot-management__item-actions">
                <button
                  className={`slot-management__btn ${
                    slot.status === SLOT_STATUS.MAINTENANCE
                      ? 'slot-management__btn--unblock'
                      : 'slot-management__btn--block'
                  }`}
                  onClick={() => handleToggleBlock(slot.id)}
                  disabled={
                    slot.status === SLOT_STATUS.ACTIVE || slot.status === SLOT_STATUS.BOOKED
                  }
                >
                  {slot.status === SLOT_STATUS.MAINTENANCE ? '🔓 Buka' : '🔒 Blokir'}
                </button>
                <button
                  className="slot-management__btn slot-management__btn--delete"
                  onClick={() => handleDeleteSlot(slot.id)}
                  disabled={
                    slot.status === SLOT_STATUS.ACTIVE || slot.status === SLOT_STATUS.BOOKED
                  }
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Summary */}
      <div className="slot-management__summary">
        <div className="slot-management__summary-item">
          <span className="slot-management__summary-label">Total Slot:</span>
          <span className="slot-management__summary-value">{state.slots.length}</span>
        </div>
        <div className="slot-management__summary-item">
          <span className="slot-management__summary-label">Tersedia:</span>
          <span className="slot-management__summary-value slot-management__summary-value--available">
            {state.slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE).length}
          </span>
        </div>
        <div className="slot-management__summary-item">
          <span className="slot-management__summary-label">Maintenance/Diblokir:</span>
          <span className="slot-management__summary-value slot-management__summary-value--maintenance">
            {state.slots.filter((s) => s.status === SLOT_STATUS.MAINTENANCE).length}
          </span>
        </div>
      </div>
    </div>
  );
}
