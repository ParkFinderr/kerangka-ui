/**
 * Mobile Profile Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button/Button';
import './MobileProfile.css';

export function MobileProfile() {
  const navigate = useNavigate();
  
  // TODO: Ini akan diambil dari context/state management nanti
  const [user] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '081234567890',
    vehicleNumber: 'B 1234 XYZ',
    vehicleBrand: 'Honda',
    vehicleModel: 'Civic',
    secondaryVehicles: [
      // Contoh kendaraan sekunder
      // { id: 1, plateNumber: 'B 5678 ABC', brand: 'Toyota', model: 'Avanza' }
    ],
    memberSince: 'Januari 2026',
    totalBookings: 24,
    activeSession: 1,
  });

  const handleLogout = () => {
    // Clear user session and parking ticket
    localStorage.removeItem('currentUser');
    localStorage.removeItem('parkingTicket');
    
    // Navigate to login page
    navigate('/mobile/login');
  };

  return (
    <div className="mobile-profile">
      <div className="mobile-profile__header">
        <div className="mobile-profile__avatar">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 className="mobile-profile__name">{user.fullName}</h2>
        <p className="mobile-profile__member-since">Member sejak {user.memberSince}</p>
      </div>

      <div className="mobile-profile__stats">
        <div className="mobile-profile__stat">
          <div className="mobile-profile__stat-value">{user.totalBookings}</div>
          <div className="mobile-profile__stat-label">Total Booking</div>
        </div>
        <div className="mobile-profile__stat-divider" />
        <div className="mobile-profile__stat">
          <div className="mobile-profile__stat-value">{user.activeSession}</div>
          <div className="mobile-profile__stat-label">Sesi Aktif</div>
        </div>
      </div>

      <div className="mobile-profile__section">
        <h3 className="mobile-profile__section-title">Informasi Pribadi</h3>
        <div className="mobile-profile__info-list">
          <div className="mobile-profile__info-item">
            <div className="mobile-profile__info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="mobile-profile__info-content">
              <div className="mobile-profile__info-label">Email</div>
              <div className="mobile-profile__info-value">{user.email}</div>
            </div>
          </div>

          <div className="mobile-profile__info-item">
            <div className="mobile-profile__info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="mobile-profile__info-content">
              <div className="mobile-profile__info-label">Nomor Telepon</div>
              <div className="mobile-profile__info-value">{user.phone}</div>
            </div>
          </div>

          <div className="mobile-profile__info-item mobile-profile__info-item--primary-vehicle">
            <div className="mobile-profile__info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="mobile-profile__info-content">
              <div className="mobile-profile__info-label">Kendaraan Utama</div>
              <div className="mobile-profile__primary-vehicle">
                <div className="mobile-profile__primary-plate">{user.vehicleNumber}</div>
                <div className="mobile-profile__primary-detail">
                  {user.vehicleBrand} {user.vehicleModel}
                </div>
              </div>
            </div>
          </div>

          {/* Kendaraan Sekunder */}
          {user.secondaryVehicles && user.secondaryVehicles.length > 0 && (
            <div className="mobile-profile__info-item mobile-profile__info-item--secondary-vehicles">
              <div className="mobile-profile__info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="mobile-profile__info-content">
                <div className="mobile-profile__info-label">Kendaraan Sekunder ({user.secondaryVehicles.length})</div>
                <div className="mobile-profile__secondary-list">
                  {user.secondaryVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="mobile-profile__secondary-item">
                      <span className="mobile-profile__secondary-plate">{vehicle.plateNumber}</span>
                      <span className="mobile-profile__secondary-detail">
                        {vehicle.brand} {vehicle.model}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mobile-profile__section">
        <h3 className="mobile-profile__section-title">Pengaturan</h3>
        <div className="mobile-profile__menu-list">
          <Link to="/mobile/edit-profile" className="mobile-profile__menu-item">
            <div className="mobile-profile__menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div className="mobile-profile__menu-content">
              <div className="mobile-profile__menu-label">Edit Profil</div>
              <div className="mobile-profile__menu-desc">Ubah informasi pribadi Anda</div>
            </div>
            <div className="mobile-profile__menu-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>

          <Link to="/mobile/history" className="mobile-profile__menu-item">
            <div className="mobile-profile__menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="mobile-profile__menu-content">
              <div className="mobile-profile__menu-label">Riwayat Parking</div>
              <div className="mobile-profile__menu-desc">Lihat semua aktivitas parking</div>
            </div>
            <div className="mobile-profile__menu-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>

          <Link to="/mobile/settings" className="mobile-profile__menu-item">
            <div className="mobile-profile__menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
              </svg>
            </div>
            <div className="mobile-profile__menu-content">
              <div className="mobile-profile__menu-label">Pengaturan</div>
              <div className="mobile-profile__menu-desc">Notifikasi dan preferensi</div>
            </div>
            <div className="mobile-profile__menu-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <div className="mobile-profile__actions">
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => navigate('/mobile')}
        >
          Kembali ke Beranda
        </Button>
        <Button 
          variant="danger" 
          fullWidth 
          onClick={handleLogout}
        >
          Keluar
        </Button>
      </div>
    </div>
  );
}
