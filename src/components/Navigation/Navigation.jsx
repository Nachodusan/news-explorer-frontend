import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function LogoutIcon({ theme }) {
  const color = theme === "light" ? "#1A1B22" : "#FFFFFF";
  return (
    <svg
      className="navigation__logout-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11.6663 14.1667L15.833 10L11.6663 5.83337M15.833 10H5.83301M9.16634 17.5H4.99967C4.55765 17.5 4.13372 17.3244 3.82116 17.0119C3.5086 16.6993 3.33301 16.2754 3.33301 15.8333V4.16667C3.33301 3.72464 3.5086 3.30072 3.82116 2.98816C4.13372 2.6756 4.55765 2.5 4.99967 2.5H9.16634"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Navigation({ theme, onSigninClick, onLogout, isMenuOpen, onToggleMenu }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <nav className={`navigation navigation_theme_${theme}`}>
      <Link to="/" className="navigation__logo">
        NewsExplorer
      </Link>

      <button
        type="button"
        className={`navigation__burger ${
          isMenuOpen ? "navigation__burger_open" : ""
        }`}
        aria-label="Menú"
        onClick={onToggleMenu}
      >
        <span className="navigation__burger-line" />
        <span className="navigation__burger-line" />
        <span className="navigation__burger-line" />
      </button>

      <ul className={`navigation__links ${isMenuOpen ? "navigation__links_open" : ""}`}>
        <li className="navigation__item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Inicio
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Artículos guardados
            </NavLink>
          </li>
        )}

        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              type="button"
              className="navigation__auth-button navigation__auth-button_logout"
              onClick={onLogout}
            >
              {currentUser?.name || "Cuenta"}
              <LogoutIcon theme={theme} />
            </button>
          ) : (
            <button
              type="button"
              className="navigation__auth-button"
              onClick={onSigninClick}
            >
              Iniciar sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
