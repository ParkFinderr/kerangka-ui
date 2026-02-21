/**
 * Notification Banner Component
 */

import './NotificationBanner.css';

export function NotificationBanner({ notifications = [] }) {
  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification--${notification.type}`}
        >
          <div className="notification__content">
            <span className="notification__message">{notification.message}</span>
            <span className="notification__time">
              {new Date(notification.timestamp).toLocaleTimeString('id-ID')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
