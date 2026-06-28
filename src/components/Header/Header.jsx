import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";

// `theme` controls the color scheme: "dark" over the home hero,
// "light" on the saved-news page. The hero (title + search form) is only
// rendered on the home page.
function Header({ theme, isHome, onSigninClick, onLogout, onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`header header_theme_${theme} ${
        isHome ? "header_home" : ""
      } ${isMenuOpen ? "header_menu-open" : ""}`}
    >
      <Navigation
        theme={theme}
        onSigninClick={onSigninClick}
        onLogout={onLogout}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      {isHome && (
        <div className="header__hero">
          <h1 className="header__title">Lo que pasa en el mundo</h1>
          <p className="header__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      )}
    </header>
  );
}

export default Header;
