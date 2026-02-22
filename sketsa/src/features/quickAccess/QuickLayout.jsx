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
      <footer className="quick-footer">
        <div className="quick-footer__content">
          <div className="quick-footer__info">
            <div className="quick-footer__brand">
              <div className="quick-footer__logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>
              <div className="quick-footer__brand-text">
                <h3 className="quick-footer__title">Parkfinder</h3>
                <p className="quick-footer__tagline">Smart Parking Solution</p>
              </div>
            </div>
            <p className="quick-footer__description">
              Sistem parkir pintar yang memudahkan Anda menemukan dan memesan slot parkir secara real-time dengan teknologi IoT terkini.
            </p>
          </div>
          <div className="quick-footer__divider"></div>
          <div className="quick-footer__bottom">
            <div className="quick-footer__copyright">
              <p>
                &copy; 2026 Parkfinder. 
                <Link to="/quick/about" className="quick-footer__about-link"> Tentang Project & Tim</Link>
              </p>
              <p className="quick-footer__project-info">Project Skripsi - Universitas</p>
            </div>
            <div className="quick-footer__links">
              <a href="#" className="quick-footer__link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="quick-footer__link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
