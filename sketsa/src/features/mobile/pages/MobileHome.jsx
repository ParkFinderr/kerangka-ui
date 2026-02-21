/**
 * Mobile Home Page
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { Button } from '../../../shared/components/Button/Button';
import { MobileToast } from '../../../shared/components/MobileToast/MobileToast';
import { NavigationGuide } from '../../../shared/components/NavigationGuide/NavigationGuide';
import { NotificationBanner } from '../../../shared/components/NotificationBanner/NotificationBanner';
import { SlotGrid } from '../../../shared/components/SlotGrid/SlotGrid';
import './MobileHome.css';

export function MobileHome() {
  const { state, dispatch } = useParkingStore();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  
  // Toast notification state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success',
  });

  // Navigation guide state
  const [navigationGuide, setNavigationGuide] = useState({
    isVisible: false,
    slot: null,
  });

  // Check for user login and parking ticket on mount
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      // No user data, redirect to login
      navigate('/mobile/login');
      return;
    }
    setCurrentUser(JSON.parse(userData));

    // Check for parking ticket
    const ticket = localStorage.getItem('parkingTicket');
    if (!ticket) {
      // No ticket found, redirect to scan page
      navigate('/mobile/scan');
      return;
    }
    setTicketInfo(JSON.parse(ticket));
  }, [navigate]);

  const availableSlots = state.slots.filter((s) => s.status === SLOT_STATUS.AVAILABLE);
  const myBookings = currentUser
    ? state.slots.filter(
        (s) =>
          s.bookedBy === currentUser.id &&
          (s.status === SLOT_STATUS.BOOKED || s.status === SLOT_STATUS.ACTIVE)
      )
    : [];

  const handleBookSlot = (slot) => {
    if (!currentUser) return;
    
    dispatch({
      type: ACTION_TYPES.BOOK_SLOT,
      payload: {
        slotId: slot.id,
        userId: currentUser.id,
        userName: currentUser.name,
        vehicleNumber: currentUser.vehicle,
      },
    });

    // Show success toast
    setToast({
      isVisible: true,
      message: `Booking berhasil! Slot ${slot.id} telah dipesan.`,
      type: 'success',
    });

    // Show navigation guide after a short delay
    setTimeout(() => {
      setNavigationGuide({
        isVisible: true,
        slot: slot,
      });
    }, 1500);
  };

  const handleArrival = () => {
    if (!navigationGuide.slot) return;

    // Activate the slot
    dispatch({
      type: ACTION_TYPES.ACTIVATE_SESSION,
      payload: { slotId: navigationGuide.slot.id },
    });

    // Close navigation guide
    setNavigationGuide({
      isVisible: false,
      slot: null,
    });

    // Show arrival toast
    setToast({
      isVisible: true,
      message: 'Selamat datang! Slot Anda kini aktif.',
      type: 'success',
    });

    // Navigate to session page
    setTimeout(() => {
      navigate('/mobile/session');
    }, 1500);
  };

  const handleChangeSlot = () => {
    if (!navigationGuide.slot) return;

    // Cancel current booking
    dispatch({
      type: ACTION_TYPES.CANCEL_BOOKING,
      payload: { slotId: navigationGuide.slot.id },
    });

    // Close navigation guide
    setNavigationGuide({
      isVisible: false,
      slot: null,
    });

    // Show info toast
    setToast({
      isVisible: true,
      message: 'Booking dibatalkan. Silakan pilih slot lain.',
      type: 'info',
    });
  };

  const handleCloseNavigationGuide = () => {
    setNavigationGuide({
      isVisible: false,
      slot: null,
    });
  };

  const handleCloseToast = () => {
    setToast({
      ...toast,
      isVisible: false,
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

      {/* User Welcome Banner */}
      {currentUser && (
        <div className="mobile-home__welcome-banner">
          <div className="mobile-home__welcome-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="mobile-home__welcome-content">
            <div className="mobile-home__welcome-greeting">Selamat datang,</div>
            <div className="mobile-home__welcome-name">{currentUser.name}</div>
            <div className="mobile-home__welcome-vehicle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              {currentUser.vehicle}
            </div>
          </div>
        </div>
      )}

      {/* Parking Ticket Info */}
      {ticketInfo && (
        <div className="mobile-home__ticket-banner">
          <div className="mobile-home__ticket-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
          </div>
          <div className="mobile-home__ticket-content">
            <div className="mobile-home__ticket-label">Tiket Parkir Aktif</div>
            <div className="mobile-home__ticket-id">{ticketInfo.id}</div>
          </div>
          <div className="mobile-home__ticket-status">
            <span className="mobile-home__ticket-badge">Aktif</span>
          </div>
        </div>
      )}

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
                <div className="mobile-home__booking-actions">
                  {slot.status === SLOT_STATUS.BOOKED && (
                    <>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => {
                          setNavigationGuide({
                            isVisible: true,
                            slot: slot,
                          });
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                        </svg>
                        Arah
                      </Button>
                      <Button
                        variant="success"
                        size="small"
                        onClick={() => handleActivateSession(slot.id)}
                      >
                        Aktifkan
                      </Button>
                    </>
                  )}
                  {slot.status === SLOT_STATUS.ACTIVE && (
                    <Button variant="primary" size="small" onClick={() => navigate('/mobile/session')}>
                      Lihat Sesi
                    </Button>
                  )}
                </div>
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

      {/* Mobile Toast Notification */}
      <MobileToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleCloseToast}
        duration={3000}
      />

      {/* Navigation Guide */}
      <NavigationGuide
        slot={navigationGuide.slot}
        isVisible={navigationGuide.isVisible}
        onArrival={handleArrival}
        onChangeSlot={handleChangeSlot}
        onClose={handleCloseNavigationGuide}
      />
    </div>
  );
}
