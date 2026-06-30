import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import About from "../About/About.jsx";
import { MESSAGES } from "../../utils/constants.js";

function Main({
  keyword,
  results,
  isSearching,
  searchError,
  hasSearched,
  visibleCount,
  onShowMore,
  isArticleSaved,
  onSave,
}) {
  return (
    <main className="main">
      {isSearching && <Preloader text="Buscando noticias..." />}

      {!isSearching && searchError && (
        <NotFound title="Algo salió mal" subtitle={searchError} />
      )}

      {!isSearching && !searchError && hasSearched && results.length === 0 && (
        <NotFound
          title={MESSAGES.nothingFound}
          subtitle={MESSAGES.nothingFoundSubtitle}
        />
      )}

      {!isSearching && !searchError && results.length > 0 && (
        <section className="main__results">
          <h2 className="main__results-title">Resultados de búsqueda</h2>
          <NewsCardList
            articles={results}
            visibleCount={visibleCount}
            keyword={keyword}
            isArticleSaved={isArticleSaved}
            onSave={onSave}
          />
          {visibleCount < results.length && (
            <button
              type="button"
              className="main__show-more"
              onClick={onShowMore}
            >
              Mostrar más
            </button>
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
