/**
 * Mobile Active Session Page
 */

import { useNavigate } from 'react-router-dom';
import { SLOT_STATUS } from '../../../core/constants/slotStatus';
import { ACTION_TYPES } from '../../../core/store/parkingReducer';
import { useParkingStore } from '../../../core/store/useParkingStore';
import { Button } from '../../../shared/components/Button/Button';
import { NotificationBanner } from '../../../shared/components/NotificationBanner/NotificationBanner';
import { StatusBadge } from '../../../shared/components/StatusBadge/StatusBadge';
import './MobileSession.css';

export function MobileSession() {
  const { state, dispatch } = useParkingStore();
  const navigate = useNavigate();

  const activeSession = state.slots.find((s) => s.status === SLOT_STATUS.ACTIVE);

  const handleCompleteSession = () => {
    if (activeSession) {
      dispatch({
        type: ACTION_TYPES.COMPLETE_SESSION,
        payload: { slotId: activeSession.id },
      });
      
      // Clear parking ticket so user must scan again
      localStorage.removeItem('parkingTicket');
      
      setTimeout(() => {
        // Navigate to scan page to get new ticket
        navigate('/mobile/scan');
      }, 1000);
    }
  };

  if (!activeSession) {
    return (
      <div className="mobile-session">
        <div className="mobile-session__empty">
          <h2>Tidak ada sesi aktif</h2>
          <p>Anda belum memiliki sesi parking yang aktif</p>
          <Button variant="primary" onClick={() => navigate('/mobile')}>
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  // Detect if there's an intrusion warning
  const hasIntrusion = state.slots.some((s) => s.status === SLOT_STATUS.INTRUSION);

  return (
    <div className="mobile-session">
      <NotificationBanner notifications={state.notifications} />

      {hasIntrusion && (
        <div className="mobile-session__alert mobile-session__alert--danger">
          🚨 PERHATIAN: Intrusi terdeteksi di area parking!
        </div>
      )}

      <div className="mobile-session__card">
        <div className="mobile-session__header">
          <h2 className="mobile-session__title">Sesi Parking Aktif</h2>
          <StatusBadge status={activeSession.status} size="large" />
        </div>

        <div className="mobile-session__info">
          <div className="mobile-session__info-item">
            <span className="mobile-session__label">Slot:</span>
            <span className="mobile-session__value">{activeSession.id}</span>
          </div>
          <div className="mobile-session__info-item">
            <span className="mobile-session__label">Zona:</span>
            <span className="mobile-session__value">{activeSession.zone}</span>
          </div>
          <div className="mobile-session__info-item">
            <span className="mobile-session__label">User:</span>
            <span className="mobile-session__value">{activeSession.userName}</span>
          </div>
          <div className="mobile-session__info-item">
            <span className="mobile-session__label">Kendaraan:</span>
            <span className="mobile-session__value">{activeSession.vehicleNumber}</span>
          </div>
          <div className="mobile-session__info-item">
            <span className="mobile-session__label">Mulai:</span>
            <span className="mobile-session__value">
              {new Date(activeSession.activatedAt).toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div className="mobile-session__actions">
          <Button
            variant="success"
            fullWidth
            onClick={handleCompleteSession}
          >
            Selesaikan Parking
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/mobile')}
          >
            Kembali
          </Button>
        </div>
      </div>

      <div className="mobile-session__instructions">
        <h3>Petunjuk:</h3>
        <ul>
          <li>Pastikan kendaraan Anda parkir dengan benar di slot yang ditentukan</li>
          <li>Jangan tinggalkan kendaraan di slot orang lain (Ghost Swap)</li>
          <li>Klik "Selesaikan Parking" saat Anda akan meninggalkan area</li>
        </ul>
      </div>
    </div>
  );
}
