/**
 * Mobile Layout
 */

import { Link, Outlet } from 'react-router-dom';
import './MobileLayout.css';

export function MobileLayout() {
  return (
    <div className="mobile-layout">
      <header className="mobile-header">
        <div className="mobile-header__top">
          <div>
            <h1 className="mobile-header__title">Smart Parking</h1>
            <p className="mobile-header__subtitle">Mobile User</p>
          </div>
          <Link to="/" className="mobile-header__back">
            ← Menu Utama
          </Link>
        </div>
      </header>
      <main className="mobile-content">
        <Outlet />
      </main>
    </div>
  );
}
