/**
 * Admin Layout
 */

import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

export function AdminLayout() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

  useEffect(() => {
    // Check if admin is authenticated
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminLoginTime');
    
    // Navigate to login page
    navigate('/admin/login');
  };

  // Don't render layout if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__content">
          <div className="admin-header__text">
            <h1 className="admin-header__title">Smart Parking Admin</h1>
            <p className="admin-header__subtitle">Dashboard & Control Panel</p>
          </div>
          <div className="admin-header__actions">
            <div className="admin-header__user">
              <span className="admin-header__user-icon">👤</span>
              <span className="admin-header__username">{adminUsername}</span>
            </div>
            <button className="admin-header__logout" onClick={handleLogout}>
              🚪 Logout
            </button>
            <Link to="/" className="admin-header__back">
              ← Menu Utama
            </Link>
          </div>
        </div>
      </header>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
