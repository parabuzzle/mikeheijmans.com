import { TextInput, Box } from "@mantine/core";
import { useTiingo } from "./provider";

export function TiingoKey() {
  const { apiKey, setApiKey } = useTiingo();

  return (
    <Box>
      <TextInput
        label="Tiingo API Key"
        placeholder="Enter your Tiingo API key"
        value={apiKey}
        onChange={(event) => setApiKey(event.currentTarget.value)}
      />
    </Box>
  );
}
