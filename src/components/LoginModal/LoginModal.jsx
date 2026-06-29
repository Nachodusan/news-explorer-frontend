import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import "./AuthFields.css";

function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToRegister,
  serverError,
  isLoading,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  // Reset the form each time the modal opens.
  useEffect(() => {
    if (isOpen) resetForm({ email: "", password: "" });
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ email: values.email, password: values.password });
  }

  return (
    <PopupWithForm
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      title="Iniciar sesión"
      buttonText="Iniciar sesión"
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
      serverError={serverError}
      switchText="o"
      switchActionText="Regístrate"
      onSwitch={onSwitchToRegister}
    >
      <label className="auth-field">
        <span className="auth-field__label">Correo electrónico</span>
        <input
          className="auth-field__input"
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="auth-field__error">{errors.email}</span>
      </label>

      <label className="auth-field">
        <span className="auth-field__label">Contraseña</span>
        <input
          className="auth-field__input"
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span className="auth-field__error">{errors.password}</span>
      </label>
    </PopupWithForm>
  );
}

export default LoginModal;
