import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { CARDS_PER_PAGE, STORAGE_KEYS, MESSAGES } from "../../utils/constants.js";
import { searchNews } from "../../utils/NewsApi.js";
import * as MainApi from "../../utils/MainApi.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modals: "signin" | "signup" | "tooltip" | null
  const [activeModal, setActiveModal] = useState(null);
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Search state
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const isHome = location.pathname === "/";

  /* --------------------------- session bootstrap --------------------------- */

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    if (!token) return;

    MainApi.getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        return MainApi.getSavedArticles(token);
      })
      .then((articles) => setSavedArticles(articles))
      .catch(() => {
        localStorage.removeItem(STORAGE_KEYS.token);
      });

    // Restore the last search so results survive a page refresh.
    try {
      const last = JSON.parse(localStorage.getItem(STORAGE_KEYS.lastSearch));
      if (last && last.results) {
        setSearchResults(last.results);
        setKeyword(last.keyword || "");
        setHasSearched(true);
      }
    } catch {
      /* ignore malformed cache */
    }
  }, []);

  /* ------------------------------- modals --------------------------------- */

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setAuthError("");
  }, []);

  const openSignin = () => {
    setAuthError("");
    setActiveModal("signin");
  };
  const openSignup = () => {
    setAuthError("");
    setActiveModal("signup");
  };

  // Close any open modal with Escape.
  useEffect(() => {
    if (!activeModal) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeModal, closeModal]);

  /* -------------------------------- auth ---------------------------------- */

  function handleRegister({ name, email, password }) {
    setIsAuthLoading(true);
    setAuthError("");
    MainApi.register({ name, email, password })
      .then(() => setActiveModal("tooltip"))
      .catch((err) => setAuthError(typeof err === "string" ? err : "Algo salió mal"))
      .finally(() => setIsAuthLoading(false));
  }

  function handleLogin({ email, password }) {
    setIsAuthLoading(true);
    setAuthError("");
    MainApi.login({ email, password })
      .then((data) => {
        localStorage.setItem(STORAGE_KEYS.token, data.token);
        return MainApi.getUserInfo(data.token).then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          return MainApi.getSavedArticles(data.token);
        });
      })
      .then((articles) => {
        setSavedArticles(articles);
        closeModal();
      })
      .catch((err) => setAuthError(typeof err === "string" ? err : "Algo salió mal"))
      .finally(() => setIsAuthLoading(false));
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.token);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
    navigate("/");
  }

  /* ------------------------------- search --------------------------------- */

  function handleSearch(query) {
    setKeyword(query);
    setIsSearching(true);
    setSearchError("");
    setHasSearched(true);
    setVisibleCount(CARDS_PER_PAGE);

    searchNews(query)
      .then((results) => {
        setSearchResults(results);
        localStorage.setItem(
          STORAGE_KEYS.lastSearch,
          JSON.stringify({ keyword: query, results })
        );
      })
      .catch((err) => {
        // Always surface the standard request-error message to the user.
        console.error("Búsqueda de noticias fallida:", err);
        setSearchResults([]);
        setSearchError(MESSAGES.requestError);
      })
      .finally(() => setIsSearching(false));
  }

  function handleShowMore() {
    setVisibleCount((c) => c + CARDS_PER_PAGE);
  }

  /* --------------------------- save / unsave ------------------------------ */

  function isArticleSaved(article) {
    return savedArticles.some((a) => a.url === article.url);
  }

  function handleSaveArticle(article) {
    if (!isLoggedIn) {
      // Rubric: an unauthorized save click opens the registration popup.
      openSignup();
      return;
    }
    const token = localStorage.getItem(STORAGE_KEYS.token);
    const existing = savedArticles.find((a) => a.url === article.url);

    if (existing) {
      // Already saved → toggle off.
      handleDeleteArticle(existing);
      return;
    }

    const payload = { ...article, keyword };
    MainApi.saveArticle(payload, token)
      .then((saved) => setSavedArticles((list) => [...list, saved]))
      .catch((err) => console.error("No se pudo guardar el artículo:", err));
  }

  function handleDeleteArticle(article) {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    const id = article._id;
    MainApi.deleteArticle(id, token)
      .then(() =>
        setSavedArticles((list) => list.filter((a) => a._id !== id))
      )
      .catch((err) => console.error("No se pudo eliminar el artículo:", err));
  }

  /* ------------------------------- render --------------------------------- */

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    theme="dark"
                    isHome={isHome}
                    onSigninClick={openSignin}
                    onLogout={handleLogout}
                    onSearch={handleSearch}
                  />
                  <Main
                    keyword={keyword}
                    results={searchResults}
                    isSearching={isSearching}
                    searchError={searchError}
                    hasSearched={hasSearched}
                    visibleCount={visibleCount}
                    onShowMore={handleShowMore}
                    isArticleSaved={isArticleSaved}
                    onSave={handleSaveArticle}
                  />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  onUnauthorized={openSignin}
                >
                  <Header
                    theme="light"
                    isHome={false}
                    onSigninClick={openSignin}
                    onLogout={handleLogout}
                  />
                  <SavedNews
                    savedArticles={savedArticles}
                    onDelete={handleDeleteArticle}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Header
                    theme="dark"
                    isHome={false}
                    onSigninClick={openSignin}
                    onLogout={handleLogout}
                  />
                  <Main
                    keyword={keyword}
                    results={[]}
                    isSearching={false}
                    searchError=""
                    hasSearched={false}
                    visibleCount={visibleCount}
                    onShowMore={handleShowMore}
                    isArticleSaved={isArticleSaved}
                    onSave={handleSaveArticle}
                  />
                </>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>

      <LoginModal
        isOpen={activeModal === "signin"}
        onClose={closeModal}
        onSubmit={handleLogin}
        onSwitchToRegister={openSignup}
        serverError={authError}
        isLoading={isAuthLoading}
      />
      <RegisterModal
        isOpen={activeModal === "signup"}
        onClose={closeModal}
        onSubmit={handleRegister}
        onSwitchToLogin={openSignin}
        serverError={authError}
        isLoading={isAuthLoading}
      />
      <InfoTooltip
        isOpen={activeModal === "tooltip"}
        onClose={closeModal}
        onSigninClick={openSignin}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
