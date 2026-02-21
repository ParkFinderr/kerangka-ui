/**
 * Home Page - Role Selection
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/components/Button/Button';
import './HomePage.css';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page__container">
        <div className="home-page__header">
          <h1 className="home-page__title">Smart Parking System</h1>
          <p className="home-page__subtitle">
            Sistem Parking Pintar dengan Deteksi Intrusion, Ghost Swap, dan Parkir Liar
          </p>
        </div>

        <div className="home-page__cards">
          <div className="role-card role-card--mobile">
            <div className="role-card__icon">📱</div>
            <h2 className="role-card__title">Mobile User</h2>
            <p className="role-card__description">
              Booking slot, aktivasi sesi parking, dan monitoring real-time
            </p>
            <ul className="role-card__features">
              <li>Booking slot parking</li>
              <li>Aktivasi sesi</li>
              <li>Notifikasi intrusi</li>
              <li>Selesaikan parking</li>
            </ul>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/mobile')}
            >
              Buka Mobile View
            </Button>
          </div>

          <div className="role-card role-card--quick">
            <div className="role-card__icon">🌐</div>
            <h2 className="role-card__title">Web Quick Access</h2>
            <p className="role-card__description">
              Dashboard publik untuk melihat status slot parking secara real-time
            </p>
            <ul className="role-card__features">
              <li>Status slot real-time</li>
              <li>Statistik okupansi</li>
              <li>Alert parkir liar</li>
              <li>Zona maintenance</li>
            </ul>
            <Button
              variant="success"
              fullWidth
              onClick={() => navigate('/quick')}
            >
              Buka Quick Access
            </Button>
          </div>

          <div className="role-card role-card--admin">
            <div className="role-card__icon">🔧</div>
            <h2 className="role-card__title">Admin Dashboard</h2>
            <p className="role-card__description">
              Control panel lengkap untuk mengelola dan mensimulasikan event
            </p>
            <ul className="role-card__features">
              <li>Simulasi intrusion</li>
              <li>Simulasi ghost swap</li>
              <li>Set maintenance</li>
              <li>Force complete slot</li>
              <li>Clear unauthorized</li>
            </ul>
            <Button
              variant="warning"
              fullWidth
              onClick={() => navigate('/admin')}
            >
              Buka Admin Panel
            </Button>
          </div>
        </div>

        <div className="home-page__info">
          <h3>Fitur Yang Tersedia:</h3>
          <div className="home-page__features-grid">
            <div className="feature-item">
              <span className="feature-item__icon">✅</span>
              <span>State Management dengan Context API + useReducer</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">🔄</span>
              <span>State Machine untuk transisi status</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">🚨</span>
              <span>Deteksi Intrusion (sensor occupied tanpa booking)</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">🔄</span>
              <span>Ghost Swap Detection (kendaraan berbeda)</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">⚠️</span>
              <span>Unauthorized Parking (parkir liar)</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">🔧</span>
              <span>Maintenance Mode untuk slot</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">⚡</span>
              <span>Force Complete oleh admin</span>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">📊</span>
              <span>Real-time Statistics & Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
