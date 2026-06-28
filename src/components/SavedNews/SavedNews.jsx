import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function SavedNews({ savedArticles, onDelete }) {
  return (
    <section className="saved-news">
      <SavedNewsHeader savedArticles={savedArticles} />

      <div className="saved-news__list">
        {savedArticles.length > 0 ? (
          <NewsCardList
            articles={savedArticles}
            isSaved={true}
            onDelete={onDelete}
          />
        ) : (
          <p className="saved-news__empty">
            Todavía no has guardado ningún artículo. Busca noticias en la página
            de inicio y guarda las que más te interesen.
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNews;
