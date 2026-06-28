// Centralized configuration. Hardcoded, non-variable values live here in
// UPPER_CASE so the rest of the app imports them from a single place.

/* ------------------------------------------------------------------ *
 * News API (third-party)                                             *
 * ------------------------------------------------------------------ */

// Your News API key. Stored in a .env file (VITE_NEWS_API_KEY), never in git.
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";

// Free-tier News API only works from localhost against newsapi.org directly;
// in production the request must be routed through TripleTen's proxy.
export const NEWS_API_BASE_URL = import.meta.env.DEV
  ? "https://newsapi.org/v2/everything"
  : "https://nomoreparties.co/news/v2/everything";

// Use simulated news data only while no real key is configured. As soon as you
// add VITE_NEWS_API_KEY to .env, real News API requests are used.
export const USE_MOCK_NEWS = !NEWS_API_KEY;

/* ------------------------------------------------------------------ *
 * Custom API (your auth + saved-articles backend — Etapa 2)          *
 * ------------------------------------------------------------------ */

// The custom backend (Etapa 2) is now live, so by default we talk to the real
// API. For offline UI work you can set VITE_USE_MOCK_MAIN=true to fall back to
// the localStorage simulation.
export const USE_MOCK_MAIN = import.meta.env.VITE_USE_MOCK_MAIN === "true";

// Base URL of your back-end. Override per environment with VITE_MAIN_API_URL
// (e.g. your deployed domain). Defaults to the local server.
export const MAIN_API_BASE_URL =
  import.meta.env.VITE_MAIN_API_URL || "http://localhost:3001";

/* ------------------------------------------------------------------ *
 * UI / storage                                                       *
 * ------------------------------------------------------------------ */

// How many cards to reveal per "Mostrar más" click.
export const CARDS_PER_PAGE = 3;

// How many days back the news search covers.
export const SEARCH_DAYS_RANGE = 7;

// Max articles requested from the free News API tier.
export const NEWS_PAGE_SIZE = 100;

// localStorage keys used by the app and the mock backend.
export const STORAGE_KEYS = {
  token: "news-explorer-token",
  users: "news-explorer-users",
  savedArticles: "news-explorer-saved",
  lastSearch: "news-explorer-last-search",
};

// User-facing messages reused across components.
export const MESSAGES = {
  emptyKeyword: "Por favor, introduzca una palabra clave",
  requestError:
    "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde",
  nothingFound: "No se ha encontrado nada",
  nothingFoundSubtitle:
    "Lo sentimos, no hemos encontrado nada que coincida con tu búsqueda.",
};
