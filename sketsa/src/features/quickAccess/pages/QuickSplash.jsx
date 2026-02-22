/**
 * Quick Access Splash Screen - Welcome Page
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './QuickSplash.css';

export function QuickSplash() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleContinue = () => {
    navigate('/quick/scan');
  };

  return (
    <div className={`quick-splash ${fadeIn ? 'quick-splash--fade-in' : ''}`}>
      <div className="quick-splash__content">
        {/* Logo/Icon */}
        <div className="quick-splash__logo">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        </div>

        {/* Welcome Text */}
        <div className="quick-splash__welcome">
          <h1 className="quick-splash__title">Selamat Datang</h1>
          <p className="quick-splash__subtitle">di Web</p>
          <h2 className="quick-splash__brand">Parkfinder</h2>
        </div>

        {/* Description */}
        <p className="quick-splash__description">
          Lihat ketersediaan slot parkir secara real-time dan temukan tempat parkir dengan mudah
        </p>

        {/* Continue Button */}
        <button className="quick-splash__button" onClick={handleContinue}>
          <span>Mulai</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Features */}
        <div className="quick-splash__features">
          <div className="quick-splash__feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span>Real-time</span>
          </div>
          <div className="quick-splash__feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Cepat</span>
          </div>
          <div className="quick-splash__feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Aman</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="quick-splash__copyright">
          <p>
            &copy; 2026 Parkfinder - 
            <Link to="/quick/about" className="quick-splash__about-link"> Tentang Project & Tim</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
