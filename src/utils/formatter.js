import * as locale from "../services/localeService";

export function getCurrencyFormatter(currentLocale) {
  let loc = { ...currentLocale };
  if (!loc._id) loc = locale.getDefaultLocale();

  return new Intl.NumberFormat(loc.language, {
    style: "currency",
    currency: loc.currency,
    minimumFractionDigits: 0,
  });
}

export default { getCurrencyFormatter };
