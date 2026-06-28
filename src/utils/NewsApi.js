import {
  USE_MOCK,
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
} from "./constants.js";
import { generateArticles } from "./mockData.js";

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error ${res.status}`);
}

// Returns the date string for `days` ago (used by the real NewsAPI request).
function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

// Search news by keyword. Resolves to an array of article objects in the
// NewsAPI `articles[]` shape.
export function searchNews(keyword) {
  if (USE_MOCK) {
    // Simulate network latency and an occasional empty result.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!keyword || !keyword.trim()) {
          reject("Por favor, introduce una palabra clave");
          return;
        }
        // "error" keyword lets us demo the failure state.
        if (keyword.trim().toLowerCase() === "error") {
          reject("Algo salió mal");
          return;
        }
        // "vacio" keyword demos the no-results state.
        if (keyword.trim().toLowerCase() === "vacio") {
          resolve([]);
          return;
        }
        resolve(generateArticles(keyword, 12));
      }, 1200);
    });
  }

  const params = new URLSearchParams({
    q: keyword,
    from: isoDaysAgo(7),
    to: isoDaysAgo(0),
    pageSize: "100",
    apiKey: NEWS_API_KEY,
  });

  return fetch(`${NEWS_API_BASE_URL}?${params.toString()}`)
    .then(checkResponse)
    .then((data) => data.articles || []);
}
