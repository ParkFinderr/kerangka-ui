/**
 * Admin Layout
 */

import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__content">
          <div className="admin-header__text">
            <h1 className="admin-header__title">Smart Parking Admin</h1>
            <p className="admin-header__subtitle">Dashboard & Control Panel</p>
          </div>
          <Link to="/" className="admin-header__back">
            ← Menu Utama
          </Link>
        </div>
      </header>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
