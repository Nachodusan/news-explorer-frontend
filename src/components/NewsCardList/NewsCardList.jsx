import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

// Renders a grid of cards. On the home page `visibleCount` limits how many
// are shown (for the "Mostrar más" pagination). On the saved-news page
// `isSaved` is true so every card shows the trash/delete control.
function NewsCardList({
  articles,
  visibleCount,
  keyword,
  isArticleSaved,
  onSave,
  onDelete,
  isSaved = false,
}) {
  const visible =
    typeof visibleCount === "number"
      ? articles.slice(0, visibleCount)
      : articles;

  return (
    <ul className="card-list">
      {visible.map((article) => (
        <NewsCard
          key={article._id || article.url}
          article={article}
          keyword={article.keyword || keyword}
          isSaved={isSaved}
          saved={isArticleSaved ? isArticleSaved(article) : false}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;
