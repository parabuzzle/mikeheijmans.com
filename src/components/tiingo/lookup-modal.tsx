"use client";
import { useState } from "react";
import {
  Box,
  Text,
  Button,
  TextInput,
  Modal,
  Group,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useTiingo } from "./provider";
import {
  getTopOfBook,
  type TiingoTopofBookResults,
  type TiingoTopofBookError,
} from "./actions";
import { IconSearch } from "@tabler/icons-react";
import { TiingoKey } from "./api-key";
import classes from "./tiingo.module.css";

export interface LookupModalProps {
  callback: (date: TiingoTopofBookResults) => void;
}

export function LookupModal({ callback }: LookupModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingStock, setLoadingStock] = useState(false);
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const { apiKey } = useTiingo();

  const lookupStock = async (ticker: string | null) => {
    setError("");
    if (apiKey === "" || apiKey === null) {
      console.log("no apikey");
      notifications.show({
        title: "No Tiingo API Key",
        message: "You must have a Tiingo API key to lookup stock prices",
        color: "red",
      });
      setLoadingStock(false);
      return;
    }

    if (ticker === "" || ticker === null) {
      setError("You must enter a stock ticker to lookup");
      notifications.show({
        title: "No Ticker",
        message: "You must enter a stock ticker to lookup",
        color: "red",
      });
      setLoadingStock(false);
      return;
    }

    try {
      const response = await getTopOfBook(ticker, apiKey);
      const errResponse = response as TiingoTopofBookError;
      const successResponse = response as TiingoTopofBookResults;

      if (errResponse.message) {
        setTicker("");
        notifications.show({
          title: "Error",
          message: errResponse.message,
          color: "red",
        });
        setLoadingStock(false);
        return;
      }

      if (successResponse.tngoLast === undefined) {
        setError("No price data found for that ticker");
        setTicker(ticker);
        notifications.show({
          title: "Error",
          message: "No price data found for that ticker",
          color: "red",
        });
        setLoadingStock(false);
        return;
      }

      //setPrice(response.tngoLast);
      callback(successResponse);
      setLoadingStock(false);
      close();
    } catch (e) {
      setTicker("");
      setError("");
      console.error(e);
      notifications.show({
        title: "Error",
        message: "There was an error looking up the stock price",
        color: "red",
      });
    }

    setLoadingStock(false);
    //close();
  };

  const modal = () => {
    return (
      <Box>
        <TiingoKey />
        <Text size="sm" hidden={apiKey !== ""}>
          To lookup a stock price, you must have a (free) Tiingo Api key. You
          can get it here:{" "}
          <Link href="https://www.tiingo.com/account/api/token" target="_blank">
            https://www.tiingo.com/account/api/token
          </Link>
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Box mt="xs">
            <TextInput
              key="ticker"
              required
              error={error}
              withAsterisk
              classNames={{ input: classes.input }}
              onChange={(e) => {
                //upper case everything
                if (error !== "") {
                  setError("");
                }
                setTicker(e.currentTarget.value.toUpperCase());
              }}
              id="ticker"
              disabled={apiKey === ""}
              label="Ticker to Lookup"
              placeholder="Enter stock symbol to lookup"
              value={ticker}
            />
          </Box>
          <Button
            fullWidth
            type="submit"
            disabled={apiKey === ""}
            loading={loadingStock}
            onClick={(e) => {
              setLoadingStock(true);
              let ticker = "";
              const tform = e.currentTarget.form;

              if (tform && tform["ticker"].value !== "") {
                ticker = tform["ticker"].value;
              }

              lookupStock(ticker);
            }}
            mt="md"
          >
            Lookup
          </Button>
        </form>
      </Box>
    );
  };

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Lookup Stock Price">
        {modal()}
      </Modal>
      <Box mb="xl">
        <Group gap="sm">
          <Button onClick={open} leftSection={<IconSearch />} size="sm">
            Lookup Current Price for a Stock Ticker
          </Button>
          <Box h={40}>
            <Text size="sm" c="dimmed">
              Powered by{" "}
            </Text>
            <Image
              alt="Tiingo"
              h={15}
              w="auto"
              fit="contain"
              src="https://www.tiingo.com/dist/images/tiingo/logos/tiingo_full_light_color.svg"
            />
          </Box>
        </Group>
      </Box>
    </Box>
  );
}
