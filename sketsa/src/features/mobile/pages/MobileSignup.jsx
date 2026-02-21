/**
 * Mobile Signup Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button/Button';
import './MobileSignup.css';

export function MobileSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    vehicleNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Nomor kendaraan wajib diisi';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Implement actual registration later
      console.log('Registration attempt:', formData);
      // For now, just navigate to login
      navigate('/mobile/login');
    }
  };

  return (
    <div className="mobile-signup">
      <div className="mobile-signup__container">
        <div className="mobile-signup__header">
          <div className="mobile-signup__logo">
            <div className="mobile-signup__logo-icon">🅿️</div>
          </div>
          <h1 className="mobile-signup__title">Daftar Akun Baru</h1>
          <p className="mobile-signup__subtitle">Mulai parkir dengan mudah</p>
        </div>

        <form className="mobile-signup__form" onSubmit={handleSubmit}>
          <div className="mobile-signup__form-group">
            <label htmlFor="fullName" className="mobile-signup__label">
              Nama Lengkap *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`mobile-signup__input ${errors.fullName ? 'mobile-signup__input--error' : ''}`}
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <span className="mobile-signup__error">{errors.fullName}</span>
            )}
          </div>

          <div className="mobile-signup__form-group">
            <label htmlFor="email" className="mobile-signup__label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mobile-signup__input ${errors.email ? 'mobile-signup__input--error' : ''}`}
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="mobile-signup__error">{errors.email}</span>
            )}
          </div>

          <div className="mobile-signup__form-group">
            <label htmlFor="phone" className="mobile-signup__label">
              Nomor Telepon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`mobile-signup__input ${errors.phone ? 'mobile-signup__input--error' : ''}`}
              placeholder="08xxxxxxxxxx"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <span className="mobile-signup__error">{errors.phone}</span>
            )}
          </div>

          <div className="mobile-signup__form-group">
            <label htmlFor="vehicleNumber" className="mobile-signup__label">
              Nomor Kendaraan *
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              className={`mobile-signup__input ${errors.vehicleNumber ? 'mobile-signup__input--error' : ''}`}
              placeholder="B 1234 XYZ"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
            />
            {errors.vehicleNumber && (
              <span className="mobile-signup__error">{errors.vehicleNumber}</span>
            )}
          </div>

          <div className="mobile-signup__form-group">
            <label htmlFor="password" className="mobile-signup__label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mobile-signup__input ${errors.password ? 'mobile-signup__input--error' : ''}`}
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="mobile-signup__error">{errors.password}</span>
            )}
          </div>

          <div className="mobile-signup__form-group">
            <label htmlFor="confirmPassword" className="mobile-signup__label">
              Konfirmasi Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`mobile-signup__input ${errors.confirmPassword ? 'mobile-signup__input--error' : ''}`}
              placeholder="Masukkan password kembali"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <span className="mobile-signup__error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="mobile-signup__terms">
            <label className="mobile-signup__checkbox">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                Saya menyetujui{' '}
                <button type="button" className="mobile-signup__link">
                  syarat dan ketentuan
                </button>
              </span>
            </label>
            {errors.terms && (
              <span className="mobile-signup__error">{errors.terms}</span>
            )}
          </div>

          <Button type="submit" variant="primary" className="mobile-signup__submit">
            Daftar
          </Button>
        </form>

        <div className="mobile-signup__divider">
          <span>atau</span>
        </div>

        <div className="mobile-signup__social">
          <button type="button" className="mobile-signup__social-btn mobile-signup__social-btn--google">
            <span className="mobile-signup__social-icon">G</span>
            Daftar dengan Google
          </button>
        </div>

        <div className="mobile-signup__footer">
          <p>
            Sudah punya akun?{' '}
            <Link to="/mobile/login" className="mobile-signup__login-link">
              Masuk di sini
            </Link>
          </p>
        </div>

        <div className="mobile-signup__back">
          <Link to="/" className="mobile-signup__back-link">
            ← Kembali ke Menu Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
