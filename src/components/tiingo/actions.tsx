"use server";

export const getTopOfBook = async (symbol: string, apiKey: string) => {
  const url = `https://api.tiingo.com/iex/?tickers=${symbol}&token=${apiKey}`;
  const response = await fetch(url);
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }

  const data = await response.json();
  return data[0];
};
