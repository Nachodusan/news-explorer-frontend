import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github.svg";
import facebookIcon from "../../images/facebook.svg";

function Footer() {
  const year = 2026;
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {year} Supersite, propulsado por News API.
      </p>

      <div className="footer__right">
        <nav className="footer__links">
          <Link to="/" className="footer__link">
            Inicio
          </Link>
          <a
            className="footer__link"
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </nav>

        <div className="footer__socials">
          <a
            className="footer__social"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img src={githubIcon} alt="GitHub" width="24" height="24" />
          </a>
          <a
            className="footer__social"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={facebookIcon} alt="Facebook" width="24" height="24" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
