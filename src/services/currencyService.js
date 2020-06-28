import http from "./httpService";

export async function getForexRate(symbol, base) {
  //from local storage
  const baseUrl = `https://api.exchangeratesapi.io/latest?base=${base}`;

  const { data } = await http.get(`${baseUrl}&symbols=${symbol}`);
  return data.rates[symbol];
}

export default { getForexRate };
