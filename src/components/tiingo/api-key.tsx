import { PasswordInput, Box } from "@mantine/core";
import { useTiingo } from "./provider";
import classes from "./tiingo.module.css";

export function TiingoKey() {
  const { apiKey, setApiKey } = useTiingo();

  return (
    <Box>
      <PasswordInput
        label="Tiingo API Key"
        placeholder="Enter your Tiingo API key"
        value={apiKey}
        classNames={{ input: classes.input }}
        onChange={(event) => setApiKey(event.currentTarget.value)}
      />
    </Box>
  );
}
