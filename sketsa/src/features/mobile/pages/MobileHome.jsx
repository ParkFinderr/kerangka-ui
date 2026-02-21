/**
 * Mobile Home Page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { DUMMY_USERS } from '../../../mock/dummySlots';
import { Button } from '../../../shared/components/Button/Button';
import { NotificationBanner } from '../../../shared/components/NotificationBanner/NotificationBanner';
import { SlotGrid } from '../../../shared/components/SlotGrid/SlotGrid';
import './MobileHome.css';

export function MobileHome() {
  const { state, dispatch } = useParkingStore();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(DUMMY_USERS[0]);

  const availableSlots = state.slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE);
  const myBookings = state.slots.filter(
    (s) =>
      s.bookedBy === selectedUser.id &&
      (s.status === SLOT_STATUS.BOOKED || s.status === SLOT_STATUS.ACTIVE)
  );

  const handleBookSlot = (slot) => {
    dispatch({
      type: ACTION_TYPES.BOOK_SLOT,
      payload: {
        slotId: slot.id,
        userId: selectedUser.id,
        userName: selectedUser.name,
        vehicleNumber: selectedUser.vehicle,
      },
    });
  };

  const handleActivateSession = (slotId) => {
    dispatch({
      type: ACTION_TYPES.ACTIVATE_SESSION,
      payload: { slotId },
    });
    navigate('/mobile/session');
  };

  return (
    <div className="mobile-home">
      <NotificationBanner notifications={state.notifications} />

      {/* User Selector */}
      <div className="mobile-home__user-selector">
        <label htmlFor="user-select" className="mobile-home__label">
          Pilih User:
        </label>
        <select
          id="user-select"
          className="mobile-home__select"
          value={selectedUser.id}
          onChange={(e) => {
            const user = DUMMY_USERS.find((u) => u.id === e.target.value);
            setSelectedUser(user);
          }}
        >
          {DUMMY_USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} - {user.vehicle}
            </option>
          ))}
        </select>
      </div>

      {/* My Bookings */}
      {myBookings.length > 0 && (
        <div className="mobile-home__section">
          <h2 className="mobile-home__title">Booking Saya</h2>
          <div className="mobile-home__bookings">
            {myBookings.map((slot) => (
              <div key={slot.id} className="mobile-home__booking-card">
                <div className="mobile-home__booking-info">
                  <h3>Slot {slot.id}</h3>
                  <p className="mobile-home__booking-time">
                    Dipesan: {new Date(slot.bookedAt).toLocaleTimeString('id-ID')}
                  </p>
                </div>
                {slot.status === SLOT_STATUS.BOOKED && (
                  <Button
                    variant="success"
                    size="small"
                    onClick={() => handleActivateSession(slot.id)}
                  >
                    Aktifkan
                  </Button>
                )}
                {slot.status === SLOT_STATUS.ACTIVE && (
                  <Button variant="primary" size="small" onClick={() => navigate('/mobile/session')}>
                    Lihat Sesi
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Slots */}
      <div className="mobile-home__section">
        <h2 className="mobile-home__title">
          Slot Tersedia ({availableSlots.length})
        </h2>
        <SlotGrid slots={availableSlots} onSlotSelect={handleBookSlot} />
      </div>
    </div>
  );
}
