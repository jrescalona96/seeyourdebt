export function getCurrencyFormatter(locale) {
  console.log(locale.currency);

  return new Intl.NumberFormat(locale.language, {
    style: "currency",
    currency: locale.currency,
    minimumFractionDigits: 2,
  });
}

export default { getCurrencyFormatter };
