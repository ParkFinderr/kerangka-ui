/**
 * Mobile Settings Page - Pengaturan
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileSettings.css';

export function MobileSettings() {
  const navigate = useNavigate();
  
  // Notification Settings
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    bookingReminder: true,
    sessionStart: true,
    sessionEnd: true,
    intrusion: true,
    ghostSwap: true,
  });

  // Display Settings - Get from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  // Apply theme based on selection
  useEffect(() => {
    const applyTheme = (selectedTheme) => {
      // Remove existing theme classes
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      
      if (selectedTheme === 'auto') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
      } else {
        document.documentElement.classList.add(`theme-${selectedTheme}`);
      }
      
      // Save to localStorage
      localStorage.setItem('theme', selectedTheme);
    };

    applyTheme(theme);

    // Listen for system theme changes when auto mode is selected
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        document.documentElement.classList.remove('theme-light', 'theme-dark');
        document.documentElement.classList.add(e.matches ? 'theme-dark' : 'theme-light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleBack = () => {
    navigate('/mobile/profile');
  };

  const handleClearCache = () => {
    if (window.confirm('Yakin ingin menghapus cache aplikasi?')) {
      console.log('Clear cache');
      // TODO: Implement cache clearing logic
    }
  };

  return (
    <div className="mobile-settings">
      <div className="mobile-settings__header">
        <button onClick={handleBack} className="mobile-settings__back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Kembali
        </button>
        <h2 className="mobile-settings__title">Pengaturan</h2>
      </div>

      <div className="mobile-settings__content">
        {/* Notification Section */}
        <div className="mobile-settings__section">
          <div className="mobile-settings__section-header">
            <h3 className="mobile-settings__section-title">Notifikasi</h3>
            <p className="mobile-settings__section-desc">Kelola preferensi notifikasi Anda</p>
          </div>

          <div className="mobile-settings__group">
            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Push Notification</div>
                  <div className="mobile-settings__item-sublabel">Terima notifikasi langsung</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationToggle('push')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>

            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Notifikasi Email</div>
                  <div className="mobile-settings__item-sublabel">Terima notifikasi via email</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationToggle('email')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>

            <div className="mobile-settings__divider" />

            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Pengingat Booking</div>
                  <div className="mobile-settings__item-sublabel">15 menit sebelum waktu</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.bookingReminder}
                  onChange={() => handleNotificationToggle('bookingReminder')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>

            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Sesi Dimulai</div>
                  <div className="mobile-settings__item-sublabel">Notifikasi saat sesi aktif</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.sessionStart}
                  onChange={() => handleNotificationToggle('sessionStart')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>

            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Sesi Selesai</div>
                  <div className="mobile-settings__item-sublabel">Notifikasi akhir parkir</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.sessionEnd}
                  onChange={() => handleNotificationToggle('sessionEnd')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>

            <div className="mobile-settings__divider" />

            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Alert Intrusion</div>
                  <div className="mobile-settings__item-sublabel">Peringatan akses tidak sah</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.intrusion}
                  onChange={() => handleNotificationToggle('intrusion')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>

            <div className="mobile-settings__item">
              <div className="mobile-settings__item-content">
                <div className="mobile-settings__item-text">
                  <div className="mobile-settings__item-label">Alert Ghost Swap</div>
                  <div className="mobile-settings__item-sublabel">Deteksi perpindahan slot</div>
                </div>
              </div>
              <label className="mobile-settings__toggle">
                <input
                  type="checkbox"
                  checked={notifications.ghostSwap}
                  onChange={() => handleNotificationToggle('ghostSwap')}
                />
                <span className="mobile-settings__toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="mobile-settings__section">
          <div className="mobile-settings__section-header">
            <h3 className="mobile-settings__section-title">Tampilan</h3>
            <p className="mobile-settings__section-desc">Personalisasi tampilan aplikasi</p>
          </div>

          <div className="mobile-settings__group">
            <div className="mobile-settings__item mobile-settings__item--column">
              <div className="mobile-settings__item-text">
                <div className="mobile-settings__item-label">Tema</div>
                <div className="mobile-settings__item-sublabel">Pilih tema aplikasi</div>
              </div>
              <div className="mobile-settings__radio-group">
                <label className="mobile-settings__radio">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === 'light'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  />
                  <span>Terang</span>
                </label>
                <label className="mobile-settings__radio">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  />
                  <span>Gelap</span>
                </label>
                <label className="mobile-settings__radio">
                  <input
                    type="radio"
                    name="theme"
                    value="auto"
                    checked={theme === 'auto'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  />
                  <span>Otomatis</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Other Actions Section */}
        <div className="mobile-settings__section">
          <div className="mobile-settings__section-header">
            <h3 className="mobile-settings__section-title">Lainnya</h3>
          </div>

          <div className="mobile-settings__group">
            <button className="mobile-settings__action-btn" onClick={handleClearCache}>
              <div className="mobile-settings__action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10" />
                  <polyline points="23 20 23 14 17 14" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </div>
              <div className="mobile-settings__action-text">
                <div className="mobile-settings__action-label">Hapus Cache</div>
                <div className="mobile-settings__action-sublabel">Bersihkan data sementara</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button className="mobile-settings__action-btn">
              <div className="mobile-settings__action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div className="mobile-settings__action-text">
                <div className="mobile-settings__action-label">Tentang Aplikasi</div>
                <div className="mobile-settings__action-sublabel">Versi 1.0.0</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}