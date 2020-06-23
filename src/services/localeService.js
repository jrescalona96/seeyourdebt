const locales = [
  {
    _id: "en-US",
    language: "en-US",
    name: "United States",
    currency: "USD",
  },
  { _id: "ja-JP", language: "ja-JP", name: "Japan", currency: "JPY" },
  { _id: "fr-CA", language: "fr-CA", name: "Canada", currency: "CAD" },
  { _id: "af-ZA", language: "af-ZA", name: "S. Africa", currency: "ZAR" },
  {
    _id: "fil-PH",
    language: "fil-PH",
    name: "Philippines",
    currency: "PHP",
  },
  { _id: "de-DE", language: "de-DE", name: "Germany", currency: "EUR" },
];

const defaultLocale = {
  _id: "en-US",
  language: "en-US",
  name: "United States",
  currency: "USD",
};

export function getDefaultLocale() {
  return defaultLocale;
}

export function getLocales() {
  return locales;
}

export function getLocale(_id) {
  return locales.find((item) => item._id === _id);
}

export function getCurrency(_id) {
  return locales.find((item) => item._id === _id);
}

export default { getLocales, getLocale, getCurrency, getDefaultLocale };
