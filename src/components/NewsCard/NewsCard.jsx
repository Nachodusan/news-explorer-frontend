import { useContext } from "react";
import "./NewsCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// `isSaved` === true → saved-news page (shows trash button + keyword label).
// Otherwise → home results (shows bookmark button + login tooltip).
function NewsCard({ article, keyword, isSaved, saved, onSave, onDelete }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const placeholder =
    "https://placehold.co/400x272/e8e8e8/b6bcbf?text=Sin+imagen";

  function handleAction() {
    if (isSaved) {
      onDelete?.(article);
    } else {
      onSave?.(article);
    }
  }

  // Tooltip text depends on context.
  const tooltipText = isSaved
    ? "Eliminar de los guardados"
    : isLoggedIn
    ? saved
      ? "Eliminar de los guardados"
      : "Guardar artículo"
    : "Inicia sesión para guardar artículos";

  return (
    <li className="card">
      <div className="card__image-wrap">
        <img
          className="card__image"
          src={article.urlToImage || placeholder}
          alt={article.title}
          onError={(e) => {
            e.currentTarget.src = placeholder;
          }}
        />

        {isSaved && keyword && (
          <span className="card__keyword">{keyword}</span>
        )}

        <div className="card__action-wrap">
          <span className="card__tooltip">{tooltipText}</span>
          <button
            type="button"
            className={`card__action ${
              isSaved
                ? "card__action_type_delete"
                : saved
                ? "card__action_type_saved"
                : "card__action_type_save"
            }`}
            onClick={handleAction}
            aria-label={tooltipText}
          >
            {isSaved ? <TrashIcon /> : <BookmarkIcon filled={saved} />}
          </button>
        </div>
      </div>

      <a
        className="card__link"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">
          {article.source?.name || article.author || "Desconocido"}
        </p>
      </a>
    </li>
  );
}

function BookmarkIcon({ filled }) {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13 19L7 14.7273L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H11C11.5304 1 12.0391 1.21071 12.4142 1.58579C12.7893 1.96086 13 2.46957 13 3V19Z"
        stroke={filled ? "none" : "#1A1B22"}
        fill={filled ? "#2F71E5" : "none"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="19"
      viewBox="0 0 14 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 4H13M5 4V2C5 1.44772 5.44772 1 6 1H8C8.55228 1 9 1.44772 9 2V4M11 4V17C11 17.5523 10.5523 18 10 18H4C3.44772 18 3 17.5523 3 17V4H11Z"
        stroke="#1A1B22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default NewsCard;
