// Maps a raw News API article (source.name, description, url, urlToImage,
// publishedAt) onto the shape the back-end and the cards use
// (source, text, link, image, date). Already-normalized articles (e.g. those
// returned from our own API) pass through unchanged.
export function normalizeArticle(raw) {
  return {
    title: raw.title || "",
    text: raw.description || raw.text || "",
    date: raw.publishedAt || raw.date || "",
    source: raw.source?.name || raw.source || raw.author || "Desconocido",
    link: raw.url || raw.link || "",
    image: raw.urlToImage || raw.image || "",
  };
}
