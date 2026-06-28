import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) {
      setError("Por favor, introduce una palabra clave");
      return;
    }
    setError("");
    onSearch(value.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__field">
        <input
          className="search-form__input"
          type="text"
          placeholder="Introduce un tema"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          aria-label="Buscar noticias"
        />
        <button type="submit" className="search-form__button">
          Buscar
        </button>
      </div>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;
