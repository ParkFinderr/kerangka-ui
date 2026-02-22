/**
 * Quick Access Dashboard Page
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { MobileToast } from '../../../shared/components/MobileToast/MobileToast';
import { NavigationGuide } from '../../../shared/components/NavigationGuide/NavigationGuide';
import { NotificationBanner } from '../../../shared/components/NotificationBanner/NotificationBanner';
import { ParkingFloorView } from '../../../shared/components/ParkingFloorView/ParkingFloorView';
import './QuickDashboard.css';

export function QuickDashboard() {
  const navigate = useNavigate();
  const { state, dispatch } = useParkingStore();
  const [ticketInfo, setTicketInfo] = useState(null);

  // Check if user has a valid ticket
  useEffect(() => {
    const ticketData = localStorage.getItem('quickAccessTicket');
    if (!ticketData) {
      // Redirect to scan page if no ticket found
      navigate('/quick/scan');
    } else {
      const ticket = JSON.parse(ticketData);
      // Check if ticket has license plate
      if (!ticket.licensePlate) {
        // Redirect back to scan to complete license plate
        navigate('/quick/scan');
      } else {
        // Parse and store ticket info
        setTicketInfo(ticket);
      }
    }
  }, [navigate]);

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

  // Booking dialog state
  const [bookingDialog, setBookingDialog] = useState({
    isVisible: false,
    slot: null,
  });

  // End session confirmation dialog state
  const [endSessionDialog, setEndSessionDialog] = useState({
    isVisible: false,
  });

  // Active booking state from ticket
  const [activeBooking, setActiveBooking] = useState(null);

  // Check for active booking
  useEffect(() => {
    if (ticketInfo && ticketInfo.activeBooking) {
      setActiveBooking(ticketInfo.activeBooking);
    }
  }, [ticketInfo]);

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

  const handleSlotSelect = (slot) => {
    // Check if slot is available for booking
    if (slot.status === SLOT_STATUS.AVAILABLE) {
      if (activeBooking) {
        setToast({
          isVisible: true,
          message: 'Anda sudah memiliki booking aktif. Harap selesaikan terlebih dahulu.',
          type: 'warning',
        });
        return;
      }
      // Show booking dialog
      setBookingDialog({
        isVisible: true,
        slot: slot,
      });
    } else if (slot.status === SLOT_STATUS.BOOKED && activeBooking?.slotId === slot.id) {
      // Show navigation for own booking
      setNavigationGuide({
        isVisible: true,
        slot: slot,
      });
    } else {
      setToast({
        isVisible: true,
        message: `Slot ${slot.id} tidak tersedia untuk booking`,
        type: 'info',
      });
    }
  };

  const handleConfirmBooking = () => {
    if (!bookingDialog.slot || !ticketInfo) return;

    const slot = bookingDialog.slot;
    
    // Dispatch booking action
    dispatch({
      type: 'BOOK_SLOT',
      payload: {
        slotId: slot.id,
        userId: ticketInfo.id,
        userName: 'Quick Access User',
        vehicleNumber: ticketInfo.licensePlate,
      },
    });

    // Save booking to ticket
    const bookingData = {
      slotId: slot.id,
      slotZone: slot.zone,
      slotPosition: slot.position,
      bookedAt: new Date().toISOString(),
      status: 'booked',
    };

    const updatedTicket = {
      ...ticketInfo,
      activeBooking: bookingData,
    };

    localStorage.setItem('quickAccessTicket', JSON.stringify(updatedTicket));
    setTicketInfo(updatedTicket);
    setActiveBooking(bookingData);

    // Close dialog and show navigation
    setBookingDialog({
      isVisible: false,
      slot: null,
    });

    setNavigationGuide({
      isVisible: true,
      slot: slot,
    });

    setToast({
      isVisible: true,
      message: `Slot ${slot.id} berhasil dibooking! Ikuti panduan navigasi.`,
      type: 'success',
    });
  };

  const handleCancelBooking = () => {
    if (!activeBooking || !ticketInfo) return;

    if (activeBooking.status === 'active') {
      // Show confirmation dialog for ending active session
      setEndSessionDialog({
        isVisible: true,
      });
    } else {
      // Cancel the booking (status: booked)
      dispatch({
        type: 'CANCEL_BOOKING',
        payload: {
          slotId: activeBooking.slotId,
        },
      });

      // Remove booking from ticket
      const updatedTicket = {
        ...ticketInfo,
        activeBooking: null,
      };

      localStorage.setItem('quickAccessTicket', JSON.stringify(updatedTicket));
      setTicketInfo(updatedTicket);
      setActiveBooking(null);

      setNavigationGuide({
        isVisible: false,
        slot: null,
      });

      setToast({
        isVisible: true,
        message: 'Booking berhasil dibatalkan',
        type: 'info',
      });
    }
  };

  const handleConfirmEndSession = () => {
    if (!activeBooking || !ticketInfo) return;

    // Close confirmation dialog
    setEndSessionDialog({
      isVisible: false,
    });

    // Complete the parking session
    dispatch({
      type: 'COMPLETE_SESSION',
      payload: {
        slotId: activeBooking.slotId,
      },
    });

    // After 2 seconds, force complete to make slot available again
    setTimeout(() => {
      dispatch({
        type: 'FORCE_COMPLETE',
        payload: {
          slotId: activeBooking.slotId,
        },
      });
    }, 2000);

    setToast({
      isVisible: true,
      message: 'Sesi parkir selesai! Silakan scan ulang untuk parkir berikutnya.',
      type: 'success',
    });

    setNavigationGuide({
      isVisible: false,
      slot: null,
    });

    // Delete ticket and redirect to scan page after 2 seconds
    setTimeout(() => {
      localStorage.removeItem('quickAccessTicket');
      navigate('/quick/scan');
    }, 2500);
  };

  const handleCancelEndSession = () => {
    setEndSessionDialog({
      isVisible: false,
    });
  };

  const handleArrival = () => {
    if (!activeBooking || !ticketInfo) return;

    // Dispatch activate session action
    dispatch({
      type: 'ACTIVATE_SESSION',
      payload: {
        slotId: activeBooking.slotId,
      },
    });

    // Update booking status to active
    const updatedBooking = {
      ...activeBooking,
      status: 'active',
      activatedAt: new Date().toISOString(),
    };

    const updatedTicket = {
      ...ticketInfo,
      activeBooking: updatedBooking,
    };

    localStorage.setItem('quickAccessTicket', JSON.stringify(updatedTicket));
    setTicketInfo(updatedTicket);
    setActiveBooking(updatedBooking);

    setNavigationGuide({
      isVisible: false,
      slot: null,
    });

    setToast({
      isVisible: true,
      message: 'Sesi parkir Anda telah diaktifkan!',
      type: 'success',
    });
  };

  const handleCloseNavigationGuide = () => {
    setNavigationGuide({
      isVisible: false,
      slot: null,
    });
  };

  const handleCloseBookingDialog = () => {
    setBookingDialog({
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

  const handleDownloadAndroid = () => {
    // Placeholder for Google Play Store URL
    // In production, replace with actual app URL
    setToast({
      isVisible: true,
      message: 'Mengarahkan ke Google Play Store...',
      type: 'info',
    });
    // window.open('https://play.google.com/store/apps/details?id=com.parkfinder', '_blank');
  };

  const handleDownloadIOS = () => {
    // Placeholder for App Store URL
    // In production, replace with actual app URL
    setToast({
      isVisible: true,
      message: 'Mengarahkan ke App Store...',
      type: 'info',
    });
    // window.open('https://apps.apple.com/app/parkfinder/id123456789', '_blank');
  };

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

      {/* Ticket Information */}
      {ticketInfo && (
        <div className="quick-dashboard__ticket-info">
          <div className="ticket-info-card">
            <div className="ticket-info-card__header">
              <div className="ticket-info-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
              </div>
              <div className="ticket-info-card__text">
                <h3 className="ticket-info-card__title">Tiket Akses Anda</h3>
                <p className="ticket-info-card__id">{ticketInfo.id}</p>
                {ticketInfo.licensePlate && (
                  <div className="ticket-info-card__vehicle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span>{ticketInfo.licensePlate}</span>
                  </div>
                )}
              </div>
              <div className="ticket-info-card__status">
                <span className="ticket-info-card__badge ticket-info-card__badge--active">Aktif</span>
              </div>
            </div>
            <div className="ticket-info-card__footer">
              <span className="ticket-info-card__time">
                Dibuat: {new Date(ticketInfo.timestamp).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Active Booking Information */}
      {activeBooking && (
        <div className="quick-dashboard__active-booking">
          <div className="active-booking-card">
            <div className="active-booking-card__header">
              <div className="active-booking-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                </svg>
              </div>
              <div className="active-booking-card__content">
                <h3 className="active-booking-card__title">
                  {activeBooking.status === 'active' ? 'Parkir Aktif' : 'Booking Aktif'}
                </h3>
                <p className="active-booking-card__slot">Slot {activeBooking.slotId}</p>
              </div>
              <div className="active-booking-card__status">
                <span className={`active-booking-card__badge active-booking-card__badge--${activeBooking.status}`}>
                  {activeBooking.status === 'active' ? 'Sedang Parkir' : 'Menuju Lokasi'}
                </span>
              </div>
            </div>
            <div className="active-booking-card__info">
              <div className="active-booking-card__row">
                <span className="active-booking-card__label">Zona:</span>
                <span className="active-booking-card__value">{activeBooking.slotZone}</span>
              </div>
              <div className="active-booking-card__row">
                <span className="active-booking-card__label">Booked:</span>
                <span className="active-booking-card__value">
                  {new Date(activeBooking.bookedAt).toLocaleString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              {activeBooking.activatedAt && (
                <div className="active-booking-card__row">
                  <span className="active-booking-card__label">Aktif sejak:</span>
                  <span className="active-booking-card__value">
                    {new Date(activeBooking.activatedAt).toLocaleString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>
            <div className="active-booking-card__actions">
              {activeBooking.status === 'booked' && (
                <button 
                  className="active-booking-card__button active-booking-card__button--navigate"
                  onClick={() => {
                    const bookedSlot = state.slots.find(s => s.id === activeBooking.slotId);
                    setNavigationGuide({
                      isVisible: true,
                      slot: bookedSlot,
                    });
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  Lihat Navigasi
                </button>
              )}
              <button 
                className="active-booking-card__button active-booking-card__button--cancel"
                onClick={handleCancelBooking}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                {activeBooking.status === 'active' ? 'Selesai Parkir' : 'Batalkan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="quick-dashboard__stats">
        <div className="stat-card stat-card--available">
          <div className="stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{availableCount}</div>
            <div className="stat-card__label">Tersedia</div>
          </div>
        </div>

        <div className="stat-card stat-card--occupied">
          <div className="stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{occupiedSlots}</div>
            <div className="stat-card__label">Terisi</div>
          </div>
        </div>

        <div className="stat-card stat-card--total">
          <div className="stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{totalSlots}</div>
            <div className="stat-card__label">Total Slot</div>
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="quick-dashboard__download">
        <div className="quick-dashboard__download-content">
          <div className="quick-dashboard__download-info">
            <div className="quick-dashboard__download-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </div>
            <div className="quick-dashboard__download-text">
              <h3 className="quick-dashboard__download-title">Download Aplikasi Mobile</h3>
              <p className="quick-dashboard__download-desc">
                Dapatkan pengalaman lebih baik dengan aplikasi mobile Parkfinder. Booking slot, navigasi, dan notifikasi real-time di genggaman Anda.
              </p>
            </div>
          </div>
          <div className="quick-dashboard__download-buttons">
            <button className="download-button download-button--android" onClick={handleDownloadAndroid}>
              <div className="download-button__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396"/>
                </svg>
              </div>
              <div className="download-button__text">
                <span className="download-button__label">Download di</span>
                <span className="download-button__platform">Google Play</span>
              </div>
            </button>
            <button className="download-button download-button--ios" onClick={handleDownloadIOS}>
              <div className="download-button__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div className="download-button__text">
                <span className="download-button__label">Download di</span>
                <span className="download-button__platform">App Store</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Parking Floor View */}
      <div className="quick-dashboard__section">
        <h2 className="quick-dashboard__title">Denah Parkir</h2>
        <ParkingFloorView slots={state.slots} onSlotSelect={handleSlotSelect} />
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
        onChangeSlot={handleCloseNavigationGuide}
        onClose={handleCloseNavigationGuide}
      />

      {/* Booking Dialog */}
      {bookingDialog.isVisible && bookingDialog.slot && (
        <div className="booking-dialog-overlay" onClick={handleCloseBookingDialog}>
          <div className="booking-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="booking-dialog__header">
              <h3 className="booking-dialog__title">Konfirmasi Booking</h3>
              <button className="booking-dialog__close" onClick={handleCloseBookingDialog}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="booking-dialog__content">
              <div className="booking-dialog__slot-info">
                <div className="booking-dialog__slot-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="booking-dialog__slot-details">
                  <h4 className="booking-dialog__slot-id">{bookingDialog.slot.id}</h4>
                  <p className="booking-dialog__slot-zone">Zona {bookingDialog.slot.zone} - Posisi {bookingDialog.slot.position}</p>
                </div>
              </div>
              
              <div className="booking-dialog__info">
                <div className="booking-dialog__info-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <span>Plat Nomor: <strong>{ticketInfo?.licensePlate}</strong></span>
                </div>
                <div className="booking-dialog__info-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Durasi: Sampai Anda selesai parkir</span>
                </div>
              </div>

              <div className="booking-dialog__note">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p>Setelah booking, ikuti panduan navigasi untuk menuju ke slot parkir Anda. Klik "Sudah Sampai" saat Anda tiba di lokasi.</p>
              </div>
            </div>
            <div className="booking-dialog__actions">
              <button 
                className="booking-dialog__button booking-dialog__button--cancel"
                onClick={handleCloseBookingDialog}
              >
                Batal
              </button>
              <button 
                className="booking-dialog__button booking-dialog__button--confirm"
                onClick={handleConfirmBooking}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Konfirmasi Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Session Confirmation Dialog */}
      {endSessionDialog.isVisible && (
        <div className="booking-dialog-overlay" onClick={handleCancelEndSession}>
          <div className="end-session-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="end-session-dialog__icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="end-session-dialog__title">Akhiri Sesi Parkir?</h3>
            <p className="end-session-dialog__message">
              Apakah Anda yakin ingin mengakhiri sesi parkir ini?
            </p>
            <div className="end-session-dialog__warning">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div>
                <strong>Perhatian:</strong>
                <p>Tiket Anda akan hangus dan Anda harus scan ulang QR code serta memasukkan plat nomor kembali untuk parkir berikutnya.</p>
              </div>
            </div>
            <div className="end-session-dialog__actions">
              <button 
                className="end-session-dialog__button end-session-dialog__button--cancel"
                onClick={handleCancelEndSession}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Batalkan
              </button>
              <button 
                className="end-session-dialog__button end-session-dialog__button--confirm"
                onClick={handleConfirmEndSession}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Ya, Akhiri Sesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
