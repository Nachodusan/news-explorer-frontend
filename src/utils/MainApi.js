import { USE_MOCK_MAIN, MAIN_API_BASE_URL, STORAGE_KEYS } from "./constants.js";

function checkResponse(res) {
  return res.json().then((data) => {
    if (res.ok) return data;
    // Surface the back-end's error message (e.g. duplicate email) to the user.
    return Promise.reject(data.message || `Error ${res.status}`);
  });
}

/* ------------------------------------------------------------------ *
 * Mock backend helpers (localStorage). Swapped out when USE_MOCK_MAIN is  *
 * false in favor of real fetch() calls to your custom API.           *
 * ------------------------------------------------------------------ */

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function delay(value, ms = 700) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function makeToken(email) {
  // Not a real JWT — just an opaque, decodable identifier for the mock.
  return "mock." + btoa(encodeURIComponent(email)) + "." + Date.now();
}

function emailFromToken(token) {
  try {
    return decodeURIComponent(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Auth                                                                *
 * ------------------------------------------------------------------ */

export function register({ name, email, password }) {
  if (USE_MOCK_MAIN) {
    const users = readStore(STORAGE_KEYS.users, []);
    if (users.some((u) => u.email === email)) {
      return delay().then(() =>
        Promise.reject("Este correo electrónico ya está registrado")
      );
    }
    users.push({ name, email, password });
    writeStore(STORAGE_KEYS.users, users);
    return delay({ name, email });
  }

  return fetch(`${MAIN_API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  if (USE_MOCK_MAIN) {
    const users = readStore(STORAGE_KEYS.users, []);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      return delay().then(() =>
        Promise.reject("Correo electrónico o contraseña incorrectos")
      );
    }
    return delay({ token: makeToken(email) });
  }

  return fetch(`${MAIN_API_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getUserInfo(token) {
  if (USE_MOCK_MAIN) {
    const email = emailFromToken(token);
    const users = readStore(STORAGE_KEYS.users, []);
    const user = users.find((u) => u.email === email);
    if (!user) return Promise.reject("Token no válido");
    return delay({ name: user.name, email: user.email }, 300);
  }

  return fetch(`${MAIN_API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

/* ------------------------------------------------------------------ *
 * Saved articles                                                      *
 * ------------------------------------------------------------------ */

function savedKeyFor(token) {
  // Each user gets their own bucket in the mock store.
  return `${STORAGE_KEYS.savedArticles}:${emailFromToken(token)}`;
}

export function getSavedArticles(token) {
  if (USE_MOCK_MAIN) {
    return delay(readStore(savedKeyFor(token), []), 300);
  }

  return fetch(`${MAIN_API_BASE_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

export function saveArticle(article, token) {
  if (USE_MOCK_MAIN) {
    const list = readStore(savedKeyFor(token), []);
    const saved = { ...article, _id: `${Date.now()}-${Math.random()}` };
    list.push(saved);
    writeStore(savedKeyFor(token), list);
    return delay(saved);
  }

  return fetch(`${MAIN_API_BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function deleteArticle(articleId, token) {
  if (USE_MOCK_MAIN) {
    const list = readStore(savedKeyFor(token), []).filter(
      (a) => a._id !== articleId
    );
    writeStore(savedKeyFor(token), list);
    return delay({ message: "Artículo eliminado" });
  }

  return fetch(`${MAIN_API_BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}
