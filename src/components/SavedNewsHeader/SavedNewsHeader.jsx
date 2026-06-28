import { useContext } from "react";
import "./SavedNewsHeader.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

// Builds the "Por las palabras clave: A, B y N más" summary line.
function keywordSummary(keywords) {
  if (keywords.length === 0) return "";
  if (keywords.length === 1) return keywords[0];
  if (keywords.length === 2) return `${keywords[0]} y ${keywords[1]}`;
  const [first, second] = keywords;
  return `${first}, ${second} y ${keywords.length - 2} más`;
}

function SavedNewsHeader({ savedArticles }) {
  const { currentUser } = useContext(CurrentUserContext);
  const count = savedArticles.length;

  const keywords = [
    ...new Set(
      savedArticles
        .map((a) => a.keyword)
        .filter(Boolean)
        .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
    ),
  ];

  return (
    <div className="saved-header">
      <p className="saved-header__caption">Artículos guardados</p>
      <h2 className="saved-header__title">
        {currentUser?.name || "Usuario"}, tienes {count}{" "}
        {count === 1 ? "artículo guardado" : "artículos guardados"}
      </h2>
      {keywords.length > 0 && (
        <p className="saved-header__keywords">
          Por las palabras clave:{" "}
          <span className="saved-header__keywords-bold">
            {keywordSummary(keywords)}
          </span>
        </p>
      )}
    </div>
  );
}

export default SavedNewsHeader;
