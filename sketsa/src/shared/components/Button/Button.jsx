/**
 * Button Component
 */

import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
