import { createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "indigo",
  defaultGradient: {
    from: "indigo",
    to: "purple",
    deg: 45,
  },
  fontFamily: "gesta, sans-serif",
  components: {
    Button: {
      defaultProps: {
        variant: "light",
      },
    },
  },
  colors: {
    dark: [
      "#ddd",
      "#ccc",
      "#999",
      "#666",
      "#0f0f0f",
      "#0c0c0c",
      "#0b0b0b",
      "#0a0a0a",
      "#030303",
      "#010101",
    ],
  },
});

export default theme;
