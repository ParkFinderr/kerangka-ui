/**
 * Mobile Edit Profile Page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button/Button';
import './MobileEditProfile.css';

export function MobileEditProfile() {
  const navigate = useNavigate();
  
  // TODO: Ini akan diambil dari context/state management nanti
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '081234567890',
    vehicleNumber: 'B 1234 XYZ',
  });

  const [errors, setErrors] = useState({});
  const [isEdited, setIsEdited] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEdited(true);
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Implement actual update profile logic
      console.log('Update profile:', formData);
      navigate('/mobile/profile');
    }
  };

  const handleCancel = () => {
    if (isEdited) {
      const confirmCancel = window.confirm('Anda memiliki perubahan yang belum disimpan. Yakin ingin kembali?');
      if (confirmCancel) {
        navigate('/mobile/profile');
      }
    } else {
      navigate('/mobile/profile');
    }
  };

  return (
    <div className="mobile-edit-profile">
      <div className="mobile-edit-profile__header">
        <button 
          onClick={handleCancel}
          className="mobile-edit-profile__back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Kembali
        </button>
        <h2 className="mobile-edit-profile__title">Edit Profil</h2>
      </div>

      <div className="mobile-edit-profile__content">
        <div className="mobile-edit-profile__avatar-section">
          <div className="mobile-edit-profile__avatar">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <button type="button" className="mobile-edit-profile__change-photo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Ubah Foto
          </button>
        </div>

        <form className="mobile-edit-profile__form" onSubmit={handleSubmit}>
          <div className="mobile-edit-profile__form-group">
            <label htmlFor="fullName" className="mobile-edit-profile__label">
              Nama Lengkap *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`mobile-edit-profile__input ${errors.fullName ? 'mobile-edit-profile__input--error' : ''}`}
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <span className="mobile-edit-profile__error">{errors.fullName}</span>
            )}
          </div>

          <div className="mobile-edit-profile__form-group">
            <label htmlFor="email" className="mobile-edit-profile__label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mobile-edit-profile__input ${errors.email ? 'mobile-edit-profile__input--error' : ''}`}
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="mobile-edit-profile__error">{errors.email}</span>
            )}
          </div>

          <div className="mobile-edit-profile__form-group">
            <label htmlFor="phone" className="mobile-edit-profile__label">
              Nomor Telepon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`mobile-edit-profile__input ${errors.phone ? 'mobile-edit-profile__input--error' : ''}`}
              placeholder="08xxxxxxxxxx"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <span className="mobile-edit-profile__error">{errors.phone}</span>
            )}
          </div>

          <div className="mobile-edit-profile__form-group">
            <label htmlFor="vehicleNumber" className="mobile-edit-profile__label">
              Nomor Kendaraan *
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              className={`mobile-edit-profile__input ${errors.vehicleNumber ? 'mobile-edit-profile__input--error' : ''}`}
              placeholder="B 1234 XYZ"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
            />
            {errors.vehicleNumber && (
              <span className="mobile-edit-profile__error">{errors.vehicleNumber}</span>
            )}
          </div>

          <div className="mobile-edit-profile__divider" />

          <div className="mobile-edit-profile__password-section">
            <h3 className="mobile-edit-profile__section-title">Ubah Password</h3>
            <p className="mobile-edit-profile__section-desc">
              Kosongkan jika tidak ingin mengubah password
            </p>

            <div className="mobile-edit-profile__form-group">
              <label htmlFor="currentPassword" className="mobile-edit-profile__label">
                Password Saat Ini
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="mobile-edit-profile__input"
                placeholder="Masukkan password saat ini"
              />
            </div>

            <div className="mobile-edit-profile__form-group">
              <label htmlFor="newPassword" className="mobile-edit-profile__label">
                Password Baru
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="mobile-edit-profile__input"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div className="mobile-edit-profile__form-group">
              <label htmlFor="confirmNewPassword" className="mobile-edit-profile__label">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="mobile-edit-profile__input"
                placeholder="Masukkan password baru kembali"
              />
            </div>
          </div>

          <div className="mobile-edit-profile__actions">
            <Button 
              type="button"
              variant="secondary" 
              fullWidth 
              onClick={handleCancel}
            >
              Batal
            </Button>
            <Button 
              type="submit"
              variant="primary" 
              fullWidth
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
