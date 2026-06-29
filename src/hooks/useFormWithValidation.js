import { useState, useCallback } from "react";

// Builds a Spanish validation message from the input's native validity state,
// so empty required fields and invalid emails both show a message below them.
function getMessage(input) {
  const { validity } = input;
  if (validity.valueMissing) return "Este campo es obligatorio";
  if (validity.typeMismatch && input.type === "email") {
    return "Introduce un correo electrónico válido";
  }
  if (validity.tooShort) {
    return `Debe tener al menos ${input.minLength} caracteres`;
  }
  if (validity.tooLong) {
    return `Debe tener como máximo ${input.maxLength} caracteres`;
  }
  return input.validationMessage;
}

// Reusable form state + live validation, shared by the Login and Register
// modals. Tracks values, per-field error messages and overall validity.
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((event) => {
    const input = event.target;
    const { name, value, form } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: input.validity.valid ? "" : getMessage(input),
    }));
    setIsValid(form.checkValidity());
  }, []);

  // Restore the form to a known state (used when a modal (re)opens).
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, errors, isValid, handleChange, resetForm };
}
