/**
 * Quick Access Scan Page - Generate Ticket ID
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickScan.css';

export function QuickScan() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [showLicensePlateForm, setShowLicensePlateForm] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [licensePlateError, setLicensePlateError] = useState('');

  // Check if user already has a ticket with license plate
  useEffect(() => {
    const existingTicket = localStorage.getItem('quickAccessTicket');
    if (existingTicket) {
      const ticket = JSON.parse(existingTicket);
      setTicketId(ticket.id);
      setScanSuccess(true);
      if (ticket.licensePlate) {
        setLicensePlate(ticket.licensePlate);
        setShowLicensePlateForm(false);
      } else {
        setShowLicensePlateForm(true);
      }
    }
  }, []);

  // Generate ticket ID: QA-YYYYMMDD-XXXX
  const generateTicketId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const sequence = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    
    return `QA-${year}${month}${day}-${sequence}`;
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

      // Save to localStorage (without license plate yet)
      localStorage.setItem('quickAccessTicket', JSON.stringify(ticket));
      
      setTicketId(newTicketId);
      setIsScanning(false);
      setScanSuccess(true);
      setShowLicensePlateForm(true);
    }, 2000);
  };

  const handleLicensePlateSubmit = (e) => {
    e.preventDefault();
    
    // Validate license plate
    const cleanedPlate = licensePlate.trim().toUpperCase();
    if (!cleanedPlate) {
      setLicensePlateError('Plat nomor wajib diisi');
      return;
    }
    
    if (cleanedPlate.length < 3) {
      setLicensePlateError('Plat nomor minimal 3 karakter');
      return;
    }

    // Update ticket with license plate
    const existingTicket = localStorage.getItem('quickAccessTicket');
    if (existingTicket) {
      const ticket = JSON.parse(existingTicket);
      ticket.licensePlate = cleanedPlate;
      localStorage.setItem('quickAccessTicket', JSON.stringify(ticket));
      
      setLicensePlate(cleanedPlate);
      setShowLicensePlateForm(false);
      setLicensePlateError('');
    }
  };

  const handleLicensePlateChange = (e) => {
    setLicensePlate(e.target.value.toUpperCase());
    setLicensePlateError('');
  };

  const handleContinue = () => {
    navigate('/quick/dashboard');
  };

  const handleRescan = () => {
    localStorage.removeItem('quickAccessTicket');
    setTicketId(null);
    setScanSuccess(false);
    setShowLicensePlateForm(false);
    setLicensePlate('');
    setLicensePlateError('');
  };

  const handleBack = () => {
    navigate('/quick');
  };

  return (
    <div className="quick-scan">
      <div className="quick-scan__container">
        <div className="quick-scan__header">
          <button onClick={handleBack} className="quick-scan__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali
          </button>
          <h2 className="quick-scan__title">Scan QR Code Parkir</h2>
        </div>

        <div className="quick-scan__content">
          {!scanSuccess && !isScanning && (
            <div className="quick-scan__instruction">
              <div className="quick-scan__icon">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3 className="quick-scan__heading">Scan QR Code</h3>
              <p className="quick-scan__description">
                Arahkan kamera ke QR code yang tersedia di gerbang masuk untuk mendapatkan tiket akses cepat digital
              </p>
              <button className="quick-scan__button" onClick={handleStartScan}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Mulai Scan
              </button>
            </div>
          )}

          {isScanning && (
            <div className="quick-scan__scanning">
              <div className="quick-scan__scanner">
                <div className="quick-scan__scanner-frame">
                  <div className="quick-scan__scanner-corner quick-scan__scanner-corner--tl"></div>
                  <div className="quick-scan__scanner-corner quick-scan__scanner-corner--tr"></div>
                  <div className="quick-scan__scanner-corner quick-scan__scanner-corner--bl"></div>
                  <div className="quick-scan__scanner-corner quick-scan__scanner-corner--br"></div>
                  <div className="quick-scan__scanner-line"></div>
                </div>
                <div className="quick-scan__qr-placeholder">
                  <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
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
              <p className="quick-scan__scanning-text">Sedang memindai QR code...</p>
            </div>
          )}

          {scanSuccess && ticketId && (
            <div className="quick-scan__success">
              <div className="quick-scan__success-icon">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="quick-scan__success-heading">
                {showLicensePlateForm ? 'Scan Berhasil!' : 'Tiket Anda Siap!'}
              </h3>
              <p className="quick-scan__success-description">
                {showLicensePlateForm 
                  ? 'Masukkan plat nomor kendaraan Anda untuk melanjutkan'
                  : 'Tiket akses cepat digital Anda telah diaktifkan'
                }
              </p>

              <div className="quick-scan__ticket">
                <div className="quick-scan__ticket-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                    <polyline points="17 2 12 7 7 2" />
                  </svg>
                  <span>Tiket Akses Cepat Digital</span>
                </div>
                <div className="quick-scan__ticket-id">{ticketId}</div>
                <div className="quick-scan__ticket-info">
                  <div className="quick-scan__ticket-row">
                    <span className="quick-scan__ticket-label">Waktu:</span>
                    <span className="quick-scan__ticket-value">
                      {new Date().toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="quick-scan__ticket-row">
                    <span className="quick-scan__ticket-label">Status:</span>
                    <span className="quick-scan__ticket-value quick-scan__ticket-value--active">Aktif</span>
                  </div>
                  {licensePlate && !showLicensePlateForm && (
                    <div className="quick-scan__ticket-row">
                      <span className="quick-scan__ticket-label">Plat Nomor:</span>
                      <span className="quick-scan__ticket-value">{licensePlate}</span>
                    </div>
                  )}
                </div>
              </div>

              {showLicensePlateForm ? (
                <form onSubmit={handleLicensePlateSubmit} className="quick-scan__form">
                  <div className="quick-scan__form-group">
                    <label htmlFor="licensePlate" className="quick-scan__form-label">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                      Plat Nomor Kendaraan
                    </label>
                    <input
                      type="text"
                      id="licensePlate"
                      value={licensePlate}
                      onChange={handleLicensePlateChange}
                      placeholder="Contoh: B1234XYZ"
                      className={`quick-scan__form-input ${licensePlateError ? 'quick-scan__form-input--error' : ''}`}
                      maxLength="15"
                      autoFocus
                    />
                    {licensePlateError && (
                      <p className="quick-scan__form-error">{licensePlateError}</p>
                    )}
                    <p className="quick-scan__form-hint">
                      Masukkan plat nomor tanpa spasi
                    </p>
                  </div>
                  <button type="submit" className="quick-scan__button quick-scan__button--primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    Simpan & Lanjutkan
                  </button>
                </form>
              ) : (
                <>
                  <button className="quick-scan__button quick-scan__button--primary" onClick={handleContinue}>
                    Lanjut ke Dashboard
                  </button>
                  <button className="quick-scan__button quick-scan__button--secondary" onClick={handleRescan}>
                    Scan Ulang
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="quick-scan__footer">
          <div className="quick-scan__help">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p>Pastikan QR code terlihat jelas dan pencahayaan cukup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
