/**
 * Navigation Guide Component
 * Panduan navigasi ke slot parkir yang di-booking
 */

import { Button } from '../Button/Button';
import './NavigationGuide.css';

export function NavigationGuide({ slot, onArrival, onChangeSlot, onClose, isVisible = true }) {
  if (!slot || !isVisible) return null;

  // Generate navigation instructions based on slot location
  const generateInstructions = () => {
    const slotId = slot.id;
    const floor = slotId.startsWith('A') || slotId.startsWith('B') ? '1' : '2';
    const zone = slotId.charAt(0);
    const side = parseInt(slotId.slice(1)) % 2 === 0 ? 'kanan' : 'kiri';

    const instructions = [];

    // Entrance instruction
    instructions.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      ),
      text: 'Masuk melalui pintu masuk utama',
      step: 1,
    });

    // Floor instruction
    if (floor === '2') {
      instructions.push({
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        ),
        text: 'Naik ke Lantai 2',
        step: 2,
        highlight: true,
      });
    } else {
      instructions.push({
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="12 5 12 19"></polyline>
          </svg>
        ),
        text: 'Tetap di Lantai 1',
        step: 2,
      });
    }

    // Zone instruction
    instructions.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      ),
      text: `Menuju Zona ${zone}`,
      step: floor === '2' ? 3 : 3,
    });

    // Direction instruction
    instructions.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      ),
      text: `Cari barisan ${side}`,
      step: floor === '2' ? 4 : 4,
    });

    // Slot instruction
    instructions.push({
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      text: `Temukan slot dengan kode ${slotId}`,
      step: floor === '2' ? 5 : 5,
      highlight: true,
    });

    return instructions;
  };

  const instructions = generateInstructions();

  return (
    <div className="navigation-guide">
      <div className="navigation-guide__overlay" onClick={onClose}></div>
      <div className="navigation-guide__content">
        {/* Header */}
        <div className="navigation-guide__header">
          <div className="navigation-guide__header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
            </svg>
          </div>
          <div className="navigation-guide__header-content">
            <h2 className="navigation-guide__title">Panduan Menuju Slot</h2>
            <div className="navigation-guide__slot-id">{slot.id}</div>
          </div>
          <button className="navigation-guide__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Instructions */}
        <div className="navigation-guide__instructions">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className={`navigation-guide__step ${
                instruction.highlight ? 'navigation-guide__step--highlight' : ''
              }`}
            >
              <div className="navigation-guide__step-number">{instruction.step}</div>
              <div className="navigation-guide__step-icon">{instruction.icon}</div>
              <div className="navigation-guide__step-text">{instruction.text}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="navigation-guide__actions">
          <Button variant="success" size="large" onClick={onArrival} fullWidth>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Saya Sudah Sampai
          </Button>
          <Button variant="outline" size="medium" onClick={onChangeSlot} fullWidth>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            Ganti Slot
          </Button>
        </div>

        {/* Info Banner */}
        <div className="navigation-guide__info">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Ikuti petunjuk arah untuk menemukan slot parkir Anda</span>
        </div>
      </div>
    </div>
  );
}
