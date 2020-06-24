import http from "./httpService";

const baseCurrency = "USD"; //from local storage
const baseUrl = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`;

export async function getForexRate(symbol) {
  const { data } = await http.get(`${baseUrl}&symbols=${symbol}`);
  return data.rates[symbol];
}

export default { getForexRate };
