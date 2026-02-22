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
    vehicleNumber: 'B 1234 XYZ', // Kendaraan utama
    vehicleBrand: 'Honda',
    vehicleModel: 'Civic',
  });

  // State untuk kendaraan sekunder
  const [secondaryVehicles, setSecondaryVehicles] = useState([
    // Contoh: { id: 1, plateNumber: 'B 5678 ABC', brand: 'Toyota', model: 'Avanza' }
  ]);

  // State untuk input kendaraan baru
  const [newVehicle, setNewVehicle] = useState({
    plateNumber: '',
    brand: '',
    model: '',
  });

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [errors, setErrors] = useState({});
  const [vehicleErrors, setVehicleErrors] = useState({});
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

    // vehicleNumber tidak perlu validasi karena field sudah disabled

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Implement actual update profile logic
      const updatedData = {
        ...formData,
        secondaryVehicles: secondaryVehicles,
      };
      console.log('Update profile:', updatedData);
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

  // Handler untuk input kendaraan baru
  const handleNewVehicleChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (vehicleErrors[name]) {
      setVehicleErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validasi kendaraan baru
  const validateNewVehicle = () => {
    const newErrors = {};

    if (!newVehicle.plateNumber.trim()) {
      newErrors.plateNumber = 'Plat nomor wajib diisi';
    } else if (newVehicle.plateNumber.length < 3) {
      newErrors.plateNumber = 'Plat nomor minimal 3 karakter';
    }

    if (!newVehicle.brand.trim()) {
      newErrors.brand = 'Merek kendaraan wajib diisi';
    }

    if (!newVehicle.model.trim()) {
      newErrors.model = 'Model kendaraan wajib diisi';
    }

    setVehicleErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Tambah kendaraan sekunder
  const handleAddVehicle = () => {
    if (validateNewVehicle()) {
      const vehicle = {
        id: Date.now(),
        plateNumber: newVehicle.plateNumber.toUpperCase(),
        brand: newVehicle.brand,
        model: newVehicle.model,
      };
      
      setSecondaryVehicles((prev) => [...prev, vehicle]);
      setNewVehicle({ plateNumber: '', brand: '', model: '' });
      setShowAddVehicle(false);
      setIsEdited(true);
    }
  };

  // Hapus kendaraan sekunder
  const handleRemoveVehicle = (vehicleId) => {
    const confirmRemove = window.confirm('Yakin ingin menghapus kendaraan ini?');
    if (confirmRemove) {
      setSecondaryVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      setIsEdited(true);
    }
  };

  // Batalkan tambah kendaraan
  const handleCancelAddVehicle = () => {
    setNewVehicle({ plateNumber: '', brand: '', model: '' });
    setVehicleErrors({});
    setShowAddVehicle(false);
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

          <div className="mobile-edit-profile__divider" />

          <h3 className="mobile-edit-profile__section-title">Kendaraan Utama</h3>
          <p className="mobile-edit-profile__section-desc">
            Data kendaraan utama tidak dapat diubah. Hubungi admin jika perlu mengubah.
          </p>

          <div className="mobile-edit-profile__form-group">
            <label htmlFor="vehicleNumber" className="mobile-edit-profile__label">
              Plat Nomor *
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              className="mobile-edit-profile__input mobile-edit-profile__input--disabled"
              placeholder="B 1234 XYZ"
              value={formData.vehicleNumber}
              disabled
              readOnly
            />
          </div>

          <div className="mobile-edit-profile__form-group">
            <label htmlFor="vehicleBrand" className="mobile-edit-profile__label">
              Merek *
            </label>
            <input
              type="text"
              id="vehicleBrand"
              name="vehicleBrand"
              className="mobile-edit-profile__input mobile-edit-profile__input--disabled"
              placeholder="Honda"
              value={formData.vehicleBrand}
              disabled
              readOnly
            />
          </div>

          <div className="mobile-edit-profile__form-group">
            <label htmlFor="vehicleModel" className="mobile-edit-profile__label">
              Model *
            </label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              className="mobile-edit-profile__input mobile-edit-profile__input--disabled"
              placeholder="Civic"
              value={formData.vehicleModel}
              disabled
              readOnly
            />
          </div>

          {/* Kendaraan Sekunder Section */}
          <div className="mobile-edit-profile__vehicles-section">
            <div className="mobile-edit-profile__vehicles-header">
              <h3 className="mobile-edit-profile__section-title">Kendaraan Sekunder</h3>
              {!showAddVehicle && (
                <button
                  type="button"
                  className="mobile-edit-profile__add-vehicle-btn"
                  onClick={() => setShowAddVehicle(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Tambah Kendaraan
                </button>
              )}
            </div>

            {/* Daftar kendaraan sekunder */}
            {secondaryVehicles.length > 0 && (
              <div className="mobile-edit-profile__vehicles-list">
                {secondaryVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="mobile-edit-profile__vehicle-card">
                    <div className="mobile-edit-profile__vehicle-info">
                      <div className="mobile-edit-profile__vehicle-plate">{vehicle.plateNumber}</div>
                      <div className="mobile-edit-profile__vehicle-details">
                        {vehicle.brand} {vehicle.model}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mobile-edit-profile__remove-vehicle-btn"
                      onClick={() => handleRemoveVehicle(vehicle.id)}
                      title="Hapus kendaraan"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form tambah kendaraan baru */}
            {showAddVehicle && (
              <div className="mobile-edit-profile__add-vehicle-form">
                <div className="mobile-edit-profile__form-group">
                  <label htmlFor="plateNumber" className="mobile-edit-profile__label">
                    Plat Nomor *
                  </label>
                  <input
                    type="text"
                    id="plateNumber"
                    name="plateNumber"
                    className={`mobile-edit-profile__input ${vehicleErrors.plateNumber ? 'mobile-edit-profile__input--error' : ''}`}
                    placeholder="B 5678 ABC"
                    value={newVehicle.plateNumber}
                    onChange={handleNewVehicleChange}
                  />
                  {vehicleErrors.plateNumber && (
                    <span className="mobile-edit-profile__error">{vehicleErrors.plateNumber}</span>
                  )}
                </div>

                <div className="mobile-edit-profile__form-group">
                  <label htmlFor="brand" className="mobile-edit-profile__label">
                    Merek *
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    className={`mobile-edit-profile__input ${vehicleErrors.brand ? 'mobile-edit-profile__input--error' : ''}`}
                    placeholder="Toyota"
                    value={newVehicle.brand}
                    onChange={handleNewVehicleChange}
                  />
                  {vehicleErrors.brand && (
                    <span className="mobile-edit-profile__error">{vehicleErrors.brand}</span>
                  )}
                </div>

                <div className="mobile-edit-profile__form-group">
                  <label htmlFor="model" className="mobile-edit-profile__label">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className={`mobile-edit-profile__input ${vehicleErrors.model ? 'mobile-edit-profile__input--error' : ''}`}
                    placeholder="Avanza"
                    value={newVehicle.model}
                    onChange={handleNewVehicleChange}
                  />
                  {vehicleErrors.model && (
                    <span className="mobile-edit-profile__error">{vehicleErrors.model}</span>
                  )}
                </div>

                <div className="mobile-edit-profile__add-vehicle-actions">
                  <button
                    type="button"
                    className="mobile-edit-profile__cancel-vehicle-btn"
                    onClick={handleCancelAddVehicle}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="mobile-edit-profile__confirm-vehicle-btn"
                    onClick={handleAddVehicle}
                  >
                    Simpan Kendaraan
                  </button>
                </div>
              </div>
            )}

            {secondaryVehicles.length === 0 && !showAddVehicle && (
              <p className="mobile-edit-profile__empty-vehicles">
                Belum ada kendaraan sekunder. Klik tombol "Tambah Kendaraan" untuk menambahkan.
              </p>
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
