"use client";
import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

export interface TiingoContextProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const TiingoContext = React.createContext<TiingoContextProps>({
  apiKey: "",
  setApiKey: () => {},
});

export const TiingoProvider = ({ children }: PropsWithChildren) => {
  const [apiKey, setApiKey] = useState("");

  const saveKey = (key: string) => {
    if (key === "") {
      localStorage.removeItem("tiingo-api-key");
      setApiKey("");
      return;
    }
    localStorage.setItem("tiingo-api-key", key);
    setApiKey(key);
  };

  useEffect(() => {
    const key = localStorage.getItem("tiingo-api-key");
    if (key) {
      setApiKey(key);
    }
  }, []);

  const state = {
    apiKey,
    setApiKey: saveKey,
  };

  return (
    <TiingoContext.Provider value={state}>{children}</TiingoContext.Provider>
  );
};

export const useTiingo = () => {
  const context = React.useContext(TiingoContext);
  if (!context) {
    throw new Error("useTiingo must be used within a TiingoProvider");
  }
  return context;
};
