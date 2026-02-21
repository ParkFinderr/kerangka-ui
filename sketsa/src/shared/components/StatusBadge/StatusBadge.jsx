/**
 * Status Badge Component
 */

import { SLOT_STATUS, STATUS_COLORS, STATUS_LABELS } from '../../../core/constants/slotStatus';
import './StatusBadge.css';

export function StatusBadge({ status, size = 'medium' }) {
  const label = STATUS_LABELS[status] || status;
  const color = STATUS_COLORS[status] || '#6b7280';

  const isIntrusion = status === SLOT_STATUS.INTRUSION;

  return (
    <span
      className={`status-badge status-badge--${size} ${isIntrusion ? 'status-badge--blink' : ''}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}
