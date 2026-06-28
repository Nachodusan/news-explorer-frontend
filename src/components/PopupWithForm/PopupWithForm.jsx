import "./PopupWithForm.css";

// Reusable modal shell for the auth forms. Handles the overlay, close button,
// title, submit button, server-side error message and the "or sign in/up"
// switch link. The actual inputs are passed in as children.
function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  buttonText,
  onSubmit,
  isValid = true,
  isLoading = false,
  serverError = "",
  switchText,
  switchActionText,
  onSwitch,
  children,
}) {
  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div className={`popup__container popup__container_type_${name}`}>
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

        <h2 className="popup__title">{title}</h2>

        <form className="popup__form" onSubmit={onSubmit} noValidate>
          {children}

          {serverError && (
            <span className="popup__server-error">{serverError}</span>
          )}

          <button
            type="submit"
            className="popup__submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Enviando..." : buttonText}
          </button>
        </form>

        <p className="popup__switch">
          {switchText}{" "}
          <button
            type="button"
            className="popup__switch-button"
            onClick={onSwitch}
          >
            {switchActionText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default PopupWithForm;
