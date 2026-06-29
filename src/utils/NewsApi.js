import {
  USE_MOCK_NEWS,
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NEWS_PAGE_SIZE,
  SEARCH_DAYS_RANGE,
  MESSAGES,
} from "./constants.js";
import { generateArticles } from "./mockData.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

// Returns the YYYY-MM-DD string for `days` ago (News API `from`/`to` params).
function isoDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

// Search news by keyword. Resolves to an array of article objects in the
// News API `articles[]` shape.
export function searchNews(keyword) {
  if (!keyword || !keyword.trim()) {
    return Promise.reject(MESSAGES.emptyKeyword);
  }

  if (USE_MOCK_NEWS) {
    // Simulate network latency and a couple of demo states.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const term = keyword.trim().toLowerCase();
        if (term === "error") {
          reject(MESSAGES.requestError);
        } else if (term === "vacio") {
          resolve([]);
        } else {
          resolve(generateArticles(keyword, 12));
        }
      }, 1200);
    });
  }

  const params = new URLSearchParams({
    q: keyword.trim(),
    apiKey: NEWS_API_KEY,
    from: isoDaysAgo(SEARCH_DAYS_RANGE),
    to: isoDaysAgo(0),
    pageSize: String(NEWS_PAGE_SIZE),
  });

  return fetch(`${NEWS_API_BASE_URL}?${params.toString()}`)
    .then(checkResponse)
    .then((data) => data.articles || []);
}
