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
          <div className="mobile-header__left">
            <div>
              <h1 className="mobile-header__title">Smart Parking</h1>
              <p className="mobile-header__subtitle">Mobile User</p>
            </div>
          </div>
          <div className="mobile-header__right">
            <Link to="/mobile/profile" className="mobile-header__profile">
              <div className="mobile-header__profile-avatar">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </Link>
            <Link to="/" className="mobile-header__back">
              ← Menu
            </Link>
          </div>
        </div>
      </header>
      <main className="mobile-content">
        <Outlet />
      </main>
    </div>
  );
}
