import { useContext } from "react";
import "./SavedNewsHeader.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

// Builds the "A, B y N más" summary line. Up to three keywords are listed in
// full; beyond that, the top two plus a remaining count.
function keywordSummary(keywords) {
  if (keywords.length === 0) return "";
  if (keywords.length === 1) return keywords[0];
  if (keywords.length === 2) return `${keywords[0]} y ${keywords[1]}`;
  if (keywords.length === 3) {
    return `${keywords[0]}, ${keywords[1]} y ${keywords[2]}`;
  }
  return `${keywords[0]}, ${keywords[1]} y ${keywords.length - 2} más`;
}

// Unique keywords sorted by how many saved articles use them (most first).
function popularKeywords(savedArticles) {
  const counts = new Map();
  savedArticles.forEach((article) => {
    if (!article.keyword) return;
    const label =
      article.keyword.charAt(0).toUpperCase() + article.keyword.slice(1);
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label]) => label);
}

function SavedNewsHeader({ savedArticles }) {
  const { currentUser } = useContext(CurrentUserContext);
  const count = savedArticles.length;
  const keywords = popularKeywords(savedArticles);

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
