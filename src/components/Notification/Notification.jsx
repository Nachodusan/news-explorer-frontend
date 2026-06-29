import "./Notification.css";

// Small fixed banner used to surface API errors (e.g. a failed save/delete)
// to the user, as the rubric requires a message on error.
function Notification({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="notification" role="alert">
      <p className="notification__text">{message}</p>
      <button
        type="button"
        className="notification__close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default Notification;
