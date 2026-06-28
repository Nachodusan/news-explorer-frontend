// Simulated News API responses. The shape mirrors the real NewsAPI.org
// `everything` endpoint so the UI code does not change when the real API
// is wired in. Cards are generated per keyword so search feels real.

const SOURCES = [
  "National Geographic",
  "The Guardian",
  "Nature",
  "BBC",
  "Reuters",
  "El País",
  "TechCrunch",
  "Science Daily",
];

const TEMPLATES = [
  {
    title: "Todo lo que necesitas saber sobre {kw}",
    text: "Un análisis en profundidad de cómo {kw} está cambiando el mundo que conocemos, con datos y testimonios de expertos del sector.",
  },
  {
    title: "{kw}: la tendencia que marca el año",
    text: "Repasamos las claves de {kw} y por qué se ha convertido en uno de los temas más comentados de las últimas semanas.",
  },
  {
    title: "Cómo {kw} afecta a tu día a día",
    text: "Pequeños cambios, grandes consecuencias. Te contamos de qué forma {kw} influye en tus rutinas más cotidianas.",
  },
  {
    title: "El futuro de {kw} según los expertos",
    text: "Investigadores de todo el mundo comparten sus predicciones sobre lo que viene en materia de {kw} para la próxima década.",
  },
  {
    title: "{kw} en cifras: el informe completo",
    text: "Los números no mienten. Este informe reúne las estadísticas más reveladoras sobre {kw} publicadas este mes.",
  },
  {
    title: "Cinco claves para entender {kw}",
    text: "Si {kw} te resulta confuso, esta guía rápida te dará el contexto necesario para no perderte en la conversación.",
  },
];

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function daysAgoISO(days) {
  // Deterministic date relative to a fixed reference so cards look recent
  // without depending on the current clock.
  const base = new Date("2026-06-28T10:00:00Z");
  base.setDate(base.getDate() - days);
  return base.toISOString();
}

// Build an article that matches the NewsAPI `articles[]` item shape.
export function buildArticle(keyword, index) {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const kw = keyword.trim().toLowerCase();
  return {
    source: { id: null, name: SOURCES[index % SOURCES.length] },
    author: SOURCES[index % SOURCES.length],
    title: capitalize(tpl.title.replace(/{kw}/g, kw)),
    description: capitalize(tpl.text.replace(/{kw}/g, kw)),
    url: `https://example.com/articulo/${encodeURIComponent(kw)}-${index}`,
    urlToImage: `https://picsum.photos/seed/${encodeURIComponent(kw)}${index}/400/272`,
    publishedAt: daysAgoISO(index % 7),
    content: tpl.text.replace(/{kw}/g, kw),
  };
}

// Generate `count` mock articles for a keyword.
export function generateArticles(keyword, count = 12) {
  return Array.from({ length: count }, (_, i) => buildArticle(keyword, i));
}
