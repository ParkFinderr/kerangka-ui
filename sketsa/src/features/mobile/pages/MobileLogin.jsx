/**
 * Mobile Login Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button/Button';
import './MobileLogin.css';

export function MobileLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication later
    console.log('Login attempt:', formData);
    
    // Simulate user data (in real app, this comes from API response)
    const userData = {
      id: 'U001',
      name: formData.email.split('@')[0] || 'User',
      email: formData.email,
      vehicle: 'B 1234 XYZ', // Default vehicle, can be updated in profile
    };
    
    // Save user data to localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Navigate to scan page to get ticket first
    navigate('/mobile/scan');
  };

  return (
    <div className="mobile-login">
      <div className="mobile-login__container">
        <div className="mobile-login__header">
          <div className="mobile-login__logo">
            <div className="mobile-login__logo-icon">🅿️</div>
          </div>
          <h1 className="mobile-login__title">Smart Parking</h1>
          <p className="mobile-login__subtitle">Masuk ke akun Anda</p>
        </div>

        <form className="mobile-login__form" onSubmit={handleSubmit}>
          <div className="mobile-login__form-group">
            <label htmlFor="email" className="mobile-login__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mobile-login__input"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mobile-login__form-group">
            <label htmlFor="password" className="mobile-login__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mobile-login__input"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mobile-login__options">
            <label className="mobile-login__checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ingat saya</span>
            </label>
            <button type="button" className="mobile-login__link">
              Lupa password?
            </button>
          </div>

          <Button type="submit" variant="primary" className="mobile-login__submit">
            Masuk
          </Button>
        </form>

        <div className="mobile-login__footer">
          <p>
            Belum punya akun?{' '}
            <Link to="/mobile/signup" className="mobile-login__signup-link">
              Daftar sekarang
            </Link>
          </p>
        </div>

        <div className="mobile-login__back">
          <Link to="/" className="mobile-login__back-link">
            ← Kembali ke Menu Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
