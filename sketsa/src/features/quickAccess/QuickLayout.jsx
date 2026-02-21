/**
 * Quick Access Layout
 */

import { Link, Outlet } from 'react-router-dom';
import './QuickLayout.css';

export function QuickLayout() {
  return (
    <div className="quick-layout">
      <header className="quick-header">
        <div className="quick-header__content">
          <div className="quick-header__text">
            <h1 className="quick-header__title">Smart Parking</h1>
            <p className="quick-header__subtitle">Quick Access View</p>
          </div>
          <Link to="/" className="quick-header__back">
            ← Menu Utama
          </Link>
        </div>
      </header>
      <main className="quick-content">
        <Outlet />
      </main>
    </div>
  );
}
