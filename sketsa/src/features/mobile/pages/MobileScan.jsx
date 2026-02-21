/**
 * Mobile Scan Ticket Page - Generate Ticket ID
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileScan.css';

export function MobileScan() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Check if user already has a ticket
  useEffect(() => {
    const existingTicket = localStorage.getItem('parkingTicket');
    if (existingTicket) {
      const ticket = JSON.parse(existingTicket);
      setTicketId(ticket.id);
      setScanSuccess(true);
    }
  }, []);

  // Generate ticket ID: TKT-YYYYMMDD-XXXX
  const generateTicketId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const sequence = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    
    return `TKT-${year}${month}${day}-${sequence}`;
  };

  // Simulate QR Code Scanning
  const handleStartScan = () => {
    setIsScanning(true);
    setScanSuccess(false);

    // Simulate scanning delay (2 seconds)
    setTimeout(() => {
      const newTicketId = generateTicketId();
      const ticket = {
        id: newTicketId,
        timestamp: new Date().toISOString(),
        status: 'active',
      };

      // Save to localStorage
      localStorage.setItem('parkingTicket', JSON.stringify(ticket));
      
      setTicketId(newTicketId);
      setIsScanning(false);
      setScanSuccess(true);
    }, 2000);
  };

  const handleContinue = () => {
    navigate('/mobile/home');
  };

  const handleRescan = () => {
    localStorage.removeItem('parkingTicket');
    setTicketId(null);
    setScanSuccess(false);
  };

  const handleBack = () => {
    navigate('/mobile/login');
  };

  return (
    <div className="mobile-scan">
      <div className="mobile-scan__header">
        <button onClick={handleBack} className="mobile-scan__back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Kembali
        </button>
        <h2 className="mobile-scan__title">Scan Tiket Parkir</h2>
      </div>

      <div className="mobile-scan__content">
        {!scanSuccess && !isScanning && (
          <div className="mobile-scan__instruction">
            <div className="mobile-scan__icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3 className="mobile-scan__heading">Scan QR Code</h3>
            <p className="mobile-scan__description">
              Arahkan kamera ke QR code yang tersedia di gerbang masuk untuk mendapatkan tiket parkir digital
            </p>
            <button className="mobile-scan__button" onClick={handleStartScan}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Mulai Scan
            </button>
          </div>
        )}

        {isScanning && (
          <div className="mobile-scan__scanning">
            <div className="mobile-scan__scanner">
              <div className="mobile-scan__scanner-frame">
                <div className="mobile-scan__scanner-corner mobile-scan__scanner-corner--tl"></div>
                <div className="mobile-scan__scanner-corner mobile-scan__scanner-corner--tr"></div>
                <div className="mobile-scan__scanner-corner mobile-scan__scanner-corner--bl"></div>
                <div className="mobile-scan__scanner-corner mobile-scan__scanner-corner--br"></div>
                <div className="mobile-scan__scanner-line"></div>
              </div>
              <div className="mobile-scan__qr-placeholder">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="5" y="5" width="3" height="3" fill="currentColor"/>
                  <rect x="16" y="5" width="3" height="3" fill="currentColor"/>
                  <rect x="5" y="16" width="3" height="3" fill="currentColor"/>
                  <rect x="16" y="16" width="3" height="3" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <p className="mobile-scan__scanning-text">Sedang memindai...</p>
          </div>
        )}

        {scanSuccess && ticketId && (
          <div className="mobile-scan__success">
            <div className="mobile-scan__success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="mobile-scan__success-heading">Scan Berhasil!</h3>
            <p className="mobile-scan__success-description">
              Tiket parkir digital Anda telah diaktifkan
            </p>

            <div className="mobile-scan__ticket">
              <div className="mobile-scan__ticket-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
                <span>Tiket Parkir Digital</span>
              </div>
              <div className="mobile-scan__ticket-id">{ticketId}</div>
              <div className="mobile-scan__ticket-info">
                <div className="mobile-scan__ticket-row">
                  <span className="mobile-scan__ticket-label">Waktu:</span>
                  <span className="mobile-scan__ticket-value">
                    {new Date().toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="mobile-scan__ticket-row">
                  <span className="mobile-scan__ticket-label">Status:</span>
                  <span className="mobile-scan__ticket-value mobile-scan__ticket-value--active">Aktif</span>
                </div>
              </div>
            </div>

            <button className="mobile-scan__button mobile-scan__button--primary" onClick={handleContinue}>
              Lanjut ke Booking
            </button>
            <button className="mobile-scan__button mobile-scan__button--secondary" onClick={handleRescan}>
              Scan Ulang
            </button>
          </div>
        )}
      </div>

      <div className="mobile-scan__footer">
        <div className="mobile-scan__help">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p>Pastikan QR code terlihat jelas dan pencahayaan cukup</p>
        </div>
      </div>
    </div>
  );
}
