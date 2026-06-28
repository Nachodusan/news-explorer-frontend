import "./InfoTooltip.css";

// Shown after a successful registration. Invites the user to sign in.
function InfoTooltip({ isOpen, onClose, onSigninClick }) {
  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div className="popup__container tooltip">
        <button
          type="button"
          className="popup__close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M12 12L28 28M28 12L12 28"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className="tooltip__title">¡Registro completado con éxito!</h2>
        <button
          type="button"
          className="tooltip__signin"
          onClick={() => {
            onClose();
            onSigninClick();
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
