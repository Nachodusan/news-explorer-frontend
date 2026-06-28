import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./AuthFields.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToRegister,
  serverError,
  isLoading,
}) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Reset the form each time the modal opens.
  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
      setErrors({ email: "", password: "" });
    }
  }, [isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));

    let message = "";
    if (name === "email" && value && !EMAIL_RE.test(value)) {
      message = "Introduce un correo electrónico válido";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  }

  const isValid =
    EMAIL_RE.test(values.email) &&
    values.password.length > 0 &&
    !errors.email &&
    !errors.password;

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
          value={values.email}
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
          value={values.password}
          onChange={handleChange}
          required
        />
        <span className="auth-field__error">{errors.password}</span>
      </label>
    </PopupWithForm>
  );
}

export default LoginModal;
