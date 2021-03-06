const locales = [
  {
    _id: "en-US",
    languageCode: "en-US",
    name: "United States",
    currency: "USD",
  },
  { _id: "ja-JP", languageCode: "ja-JP", name: "Japan", currency: "JPY" },
  { _id: "fr-CA", languageCode: "fr-CA", name: "Canada", currency: "CAD" },
  { _id: "af-ZA", languageCode: "af-ZA", name: "S. Africa", currency: "ZAR" },
  {
    _id: "fil-PH",
    languageCode: "fil-PH",
    name: "Philippines",
    currency: "PHP",
  },
  { _id: "de-DE", languageCode: "de-DE", name: "Germany", currency: "EUR" },
];

const defaultLocale = {
  _id: "en-US",
  languageCode: "en-US",
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
