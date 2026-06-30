import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import "../LoginModal/AuthFields.css";

function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
  serverError,
  isLoading,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    if (isOpen) resetForm({ email: "", password: "", name: "" });
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      name: values.name.trim(),
      email: values.email,
      password: values.password,
    });
  }

  return (
    <PopupWithForm
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      title="Regístrate"
      buttonText="Regístrate"
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
      serverError={serverError}
      switchText="o"
      switchActionText="Iniciar sesión"
      onSwitch={onSwitchToLogin}
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
          minLength={8}
          required
        />
        <span className="auth-field__error">{errors.password}</span>
      </label>

      <label className="auth-field">
        <span className="auth-field__label">Nombre de usuario</span>
        <input
          className="auth-field__input"
          type="text"
          name="name"
          placeholder="Introduce tu nombre de usuario"
          value={values.name || ""}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
        <span className="auth-field__error">{errors.name}</span>
      </label>
    </PopupWithForm>
  );
}

export default RegisterModal;
