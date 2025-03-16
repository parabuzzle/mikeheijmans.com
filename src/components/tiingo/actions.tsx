"use server";

export interface TiingoTopofBookResults {
  ticker: string;
  timestamp?: string | null;
  quoteTimestamp?: string | null;
  lastSaleTimestamp?: string | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  mid?: number | null;
  tngoLast: number;
  last?: number | null;
  lastSize?: number | null;
  bidSize?: number | null;
  bidPrice?: number | null;
  askPrice?: number | null;
  askSize?: number | null;
  volume?: number | null;
  prevClose?: number | null;
}

export interface TiingoTopofBookError {
  message: string;
}

export const getTopOfBook = async (
  symbol: string,
  apiKey: string
): Promise<TiingoTopofBookResults | TiingoTopofBookError> => {
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

  const data = (await response.json()) as TiingoTopofBookResults[];
  //console.log(data);
  return data[0] || {};
};
