import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "../LoginModal/AuthFields.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
  serverError,
  isLoading,
}) {
  const [values, setValues] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "" });
      setErrors({ email: "", password: "", name: "" });
    }
  }, [isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));

    let message = "";
    if (name === "email" && value && !EMAIL_RE.test(value)) {
      message = "Introduce un correo electrónico válido";
    }
    if (name === "password" && value && value.length < 6) {
      message = "La contraseña debe tener al menos 6 caracteres";
    }
    if (name === "name" && value && value.trim().length < 2) {
      message = "El nombre debe tener al menos 2 caracteres";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  }

  const isValid =
    EMAIL_RE.test(values.email) &&
    values.password.length >= 6 &&
    values.name.trim().length >= 2 &&
    !errors.email &&
    !errors.password &&
    !errors.name;

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

      <label className="auth-field">
        <span className="auth-field__label">Nombre de usuario</span>
        <input
          className="auth-field__input"
          type="text"
          name="name"
          placeholder="Introduce tu nombre de usuario"
          value={values.name}
          onChange={handleChange}
          required
        />
        <span className="auth-field__error">{errors.name}</span>
      </label>
    </PopupWithForm>
  );
}

export default RegisterModal;
