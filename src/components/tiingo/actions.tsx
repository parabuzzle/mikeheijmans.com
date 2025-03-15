"use server";

export const getTopOfBook = async (symbol: string, apiKey: string) => {
  let key = apiKey;

  if (key === process.env.TIINGO_BYPASS) {
    key = process.env.TIINGO_API_KEY as string;
  }
  const url = `https://api.tiingo.com/iex/?tickers=${symbol}&token=${key}`;
  const response = await fetch(url);
  console.log(url);
  //console.log(response);
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return Error("Invalid API key");
    }
    return Error("Failed to fetch stock data");
  }

  const data = await response.json();
  //console.log(data);
  return data[0] || {};
};
