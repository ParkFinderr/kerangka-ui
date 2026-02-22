/**
 * Quick About Page - Project Information & Contributors
 */

import './QuickAbout.css';

export function QuickAbout() {
  const contributors = [
    {
      id: 1,
      name: 'Imam Assidiqqi',
      role: 'Project Leader & Full-Stack Developer',
      description: 'Bertanggung jawab atas arsitektur sistem, pengembangan backend, dan koordinasi tim.',
      avatar: 'IA',
    },
    {
      id: 2,
      name: 'Contributor 2',
      role: 'Frontend Developer',
      description: 'Mengembangkan antarmuka pengguna mobile dan web dengan React.js.',
      avatar: 'C2',
    },
    {
      id: 3,
      name: 'Contributor 3',
      role: 'IoT Engineer',
      description: 'Merancang dan mengimplementasikan sistem sensor parkir berbasis IoT.',
      avatar: 'C3',
    },
    {
      id: 4,
      name: 'Contributor 4',
      role: 'UI/UX Designer',
      description: 'Mendesain pengalaman pengguna dan antarmuka visual aplikasi.',
      avatar: 'C4',
    },
    {
      id: 5,
      name: 'Contributor 5',
      role: 'Database & Backend Engineer',
      description: 'Mengelola database, API development, dan optimasi performa sistem.',
      avatar: 'C5',
    },
  ];

  return (
    <div className="quick-about">
      {/* Hero Section */}
      <div className="quick-about__hero">
        <div className="quick-about__hero-content">
          <div className="quick-about__hero-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
          </div>
          <h1 className="quick-about__hero-title">Tentang Parkfinder</h1>
          <p className="quick-about__hero-subtitle">Smart Parking System Project</p>
        </div>
      </div>

      {/* Project Info */}
      <div className="quick-about__section">
        <div className="quick-about__card">
          <h2 className="quick-about__title">Tentang Project</h2>
          <div className="quick-about__content">
            <p className="quick-about__text">
              <strong>Parkfinder</strong> adalah sistem parkir pintar berbasis IoT yang dirancang untuk memudahkan pengguna dalam menemukan dan memesan slot parkir secara real-time. Project ini merupakan hasil kolaborasi tim untuk tugas akhir/skripsi dengan fokus pada implementasi teknologi Internet of Things (IoT) dalam solusi parkir perkotaan.
            </p>
            
            <div className="quick-about__features-grid">
              <div className="quick-about__feature-item">
                <div className="quick-about__feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>Real-time Monitoring</h3>
                <p>Pemantauan ketersediaan slot parkir secara langsung menggunakan sensor IoT.</p>
              </div>

              <div className="quick-about__feature-item">
                <div className="quick-about__feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <h3>Mobile Application</h3>
                <p>Aplikasi mobile untuk booking slot, navigasi, dan notifikasi real-time.</p>
              </div>

              <div className="quick-about__feature-item">
                <div className="quick-about__feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3>Web Dashboard</h3>
                <p>Dashboard admin untuk monitoring dan manajemen sistem parkir.</p>
              </div>

              <div className="quick-about__feature-item">
                <div className="quick-about__feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                </div>
                <h3>Navigation Guide</h3>
                <p>Panduan navigasi step-by-step menuju slot parkir yang telah dipesan.</p>
              </div>
            </div>

            <div className="quick-about__tech-stack">
              <h3 className="quick-about__subtitle">Technology Stack</h3>
              <div className="quick-about__tech-list">
                <span className="quick-about__tech-badge">React.js</span>
                <span className="quick-about__tech-badge">Node.js</span>
                <span className="quick-about__tech-badge">IoT Sensors</span>
                <span className="quick-about__tech-badge">WebSocket</span>
                <span className="quick-about__tech-badge">REST API</span>
                <span className="quick-about__tech-badge">MongoDB</span>
                <span className="quick-about__tech-badge">Arduino/ESP32</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributors */}
      <div className="quick-about__section">
        <div className="quick-about__card">
          <h2 className="quick-about__title">Tim Pengembang</h2>
          <p className="quick-about__text quick-about__text--centered">
            Project ini dikembangkan oleh tim yang terdiri dari 5 anggota dengan berbagai keahlian dan peran.
          </p>
          
          <div className="quick-about__contributors">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="contributor-card">
                <div className="contributor-card__avatar">
                  {contributor.avatar}
                </div>
                <div className="contributor-card__content">
                  <h3 className="contributor-card__name">{contributor.name}</h3>
                  <p className="contributor-card__role">{contributor.role}</p>
                  <p className="contributor-card__description">{contributor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Info */}
      <div className="quick-about__section">
        <div className="quick-about__card quick-about__card--academic">
          <div className="quick-about__academic-content">
            <div className="quick-about__academic-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className="quick-about__academic-text">
              <h3>Project Tugas Akhir / Skripsi</h3>
              <p>Universitas - Fakultas Teknik</p>
              <p className="quick-about__year">Tahun Akademik 2025/2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="quick-about__copyright">
        <p>&copy; 2026 Parkfinder. All rights reserved.</p>
      </div>
    </div>
  );
}
