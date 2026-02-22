/**
 * Admin Login Page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Username dan password harus diisi');
      return;
    }

    // Hardcoded admin credentials (in production, this should be backend)
    const validAdmin = {
      username: 'admin',
      password: 'admin123',
    };

    if (
      credentials.username === validAdmin.username &&
      credentials.password === validAdmin.password
    ) {
      // Store admin session
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminUsername', credentials.username);
      localStorage.setItem('adminLoginTime', new Date().toISOString());

      // Navigate to admin dashboard
      navigate('/admin');
    } else {
      setError('Username atau password salah');
      setCredentials((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__header">
          <div className="admin-login__icon">🔐</div>
          <h1 className="admin-login__title">Admin Login</h1>
          <p className="admin-login__subtitle">Smart Parking Management System</p>
        </div>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          {error && (
            <div className="admin-login__error">
              <span className="admin-login__error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="admin-login__field">
            <label htmlFor="username" className="admin-login__label">
              Username
            </label>
            <div className="admin-login__input-wrapper">
              <span className="admin-login__input-icon">👤</span>
              <input
                type="text"
                id="username"
                name="username"
                className="admin-login__input"
                placeholder="Masukkan username"
                value={credentials.username}
                onChange={handleInputChange}
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div className="admin-login__field">
            <label htmlFor="password" className="admin-login__label">
              Password
            </label>
            <div className="admin-login__input-wrapper">
              <span className="admin-login__input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="admin-login__input"
                placeholder="Masukkan password"
                value={credentials.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-login__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-login__submit">
            Login
          </button>
        </form>

        <div className="admin-login__footer">
          <button
            type="button"
            className="admin-login__back"
            onClick={() => navigate('/')}
          >
            ← Kembali ke Menu Utama
          </button>
        </div>

        <div className="admin-login__info">
          <p className="admin-login__info-text">
            💡 Demo Credentials:<br />
            Username: <strong>admin</strong><br />
            Password: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
