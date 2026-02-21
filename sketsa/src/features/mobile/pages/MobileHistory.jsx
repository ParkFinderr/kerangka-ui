/**
 * Mobile History Page - Riwayat Parkir
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../../../shared/components/StatusBadge/StatusBadge';
import './MobileHistory.css';

export function MobileHistory() {
  const navigate = useNavigate();
  
  // TODO: Data ini akan diambil dari API/state management nanti
  const [historyData] = useState([
    {
      id: 1,
      slotNumber: 'A-01',
      date: '2026-02-20',
      startTime: '08:30',
      endTime: '12:45',
      duration: '4h 15m',
      status: 'completed',
    },
    {
      id: 2,
      slotNumber: 'B-05',
      date: '2026-02-19',
      startTime: '14:00',
      endTime: '16:30',
      duration: '2h 30m',
      status: 'completed',
    },
    {
      id: 3,
      slotNumber: 'A-03',
      date: '2026-02-18',
      startTime: '09:15',
      endTime: '11:00',
      duration: '1h 45m',
      status: 'completed',
    },
    {
      id: 4,
      slotNumber: 'C-12',
      date: '2026-02-17',
      startTime: '13:00',
      endTime: '18:20',
      duration: '5h 20m',
      status: 'completed',
    },
    {
      id: 5,
      slotNumber: 'B-08',
      date: '2026-02-16',
      startTime: '10:45',
      endTime: '12:15',
      duration: '1h 30m',
      status: 'completed',
    },
    {
      id: 6,
      slotNumber: 'A-02',
      date: '2026-02-15',
      startTime: '07:30',
      endTime: 'Ongoing',
      duration: 'Active',
      status: 'active',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const filteredHistory = historyData.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const totalSessions = historyData.length;
  const completedSessions = historyData.filter((item) => item.status === 'completed').length;
  const activeSessions = historyData.filter((item) => item.status === 'active').length;

  const handleBack = () => {
    navigate('/mobile/profile');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="mobile-history">
      <div className="mobile-history__header">
        <button onClick={handleBack} className="mobile-history__back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Kembali
        </button>
        <h2 className="mobile-history__title">Riwayat Parkir</h2>
      </div>

      <div className="mobile-history__stats">
        <div className="mobile-history__stat-card">
          <div className="mobile-history__stat-value">{totalSessions}</div>
          <div className="mobile-history__stat-label">Total Sesi</div>
        </div>
        <div className="mobile-history__stat-card">
          <div className="mobile-history__stat-value mobile-history__stat-value--success">
            {completedSessions}
          </div>
          <div className="mobile-history__stat-label">Selesai</div>
        </div>
        <div className="mobile-history__stat-card">
          <div className="mobile-history__stat-value mobile-history__stat-value--active">
            {activeSessions}
          </div>
          <div className="mobile-history__stat-label">Aktif</div>
        </div>
      </div>

      <div className="mobile-history__filters">
        <button
          className={`mobile-history__filter-btn ${filterStatus === 'all' ? 'mobile-history__filter-btn--active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Semua
        </button>
        <button
          className={`mobile-history__filter-btn ${filterStatus === 'active' ? 'mobile-history__filter-btn--active' : ''}`}
          onClick={() => setFilterStatus('active')}
        >
          Aktif
        </button>
        <button
          className={`mobile-history__filter-btn ${filterStatus === 'completed' ? 'mobile-history__filter-btn--active' : ''}`}
          onClick={() => setFilterStatus('completed')}
        >
          Selesai
        </button>
      </div>

      <div className="mobile-history__list">
        {filteredHistory.length === 0 ? (
          <div className="mobile-history__empty">
            <div className="mobile-history__empty-icon">📋</div>
            <p className="mobile-history__empty-text">Tidak ada riwayat parkir</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div key={item.id} className="mobile-history__item">
              <div className="mobile-history__item-header">
                <div className="mobile-history__slot-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                  Slot {item.slotNumber}
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="mobile-history__item-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatDate(item.date)}
              </div>

              <div className="mobile-history__item-details">
                <div className="mobile-history__detail">
                  <div className="mobile-history__detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="mobile-history__detail-content">
                    <div className="mobile-history__detail-label">Waktu</div>
                    <div className="mobile-history__detail-value">
                      {item.startTime} - {item.endTime}
                    </div>
                  </div>
                </div>

                <div className="mobile-history__detail">
                  <div className="mobile-history__detail-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <div className="mobile-history__detail-content">
                    <div className="mobile-history__detail-label">Durasi</div>
                    <div className="mobile-history__detail-value">{item.duration}</div>
                  </div>
                </div>
              </div>

              {item.status === 'active' && (
                <button className="mobile-history__view-btn">
                  Lihat Sesi Aktif
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
