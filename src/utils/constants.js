// Centralized configuration. When the real backend is ready, only these
// endpoints and the USE_MOCK flag below need to change.

// Toggle between mock data and the real APIs.
export const USE_MOCK = true;

// Real backend (your custom auth + saved-articles API).
export const MAIN_API_BASE_URL = "http://localhost:3001";

// News API (third-party). In production these requests are proxied through
// your own backend so the API key stays secret.
export const NEWS_API_BASE_URL = "https://nomoreparties.co/news/v2/everything";
export const NEWS_API_KEY = "YOUR_NEWS_API_KEY";

// How many cards to reveal per "Mostrar más" click.
export const CARDS_PER_PAGE = 3;

// localStorage keys used by the mock backend.
export const STORAGE_KEYS = {
  token: "news-explorer-token",
  users: "news-explorer-users",
  savedArticles: "news-explorer-saved",
  lastSearch: "news-explorer-last-search",
};
