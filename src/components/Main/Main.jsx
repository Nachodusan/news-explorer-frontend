import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import About from "../About/About.jsx";

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
        <NotFound
          title="Algo salió mal"
          subtitle="Lo sentimos, ha ocurrido un error durante la solicitud. Puede que haya un problema de conexión o que el servidor no responda. Inténtalo de nuevo más tarde."
        />
      )}

      {!isSearching && !searchError && hasSearched && results.length === 0 && (
        <NotFound
          title="No se ha encontrado nada"
          subtitle="Lo sentimos, no hemos encontrado nada que coincida con tu búsqueda."
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
