import { createTheme } from "@mantine/core";

const defaultInputSize = "md";

const theme = createTheme({
  primaryColor: "violet",
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
    TextInput: {
      defaultProps: {
        size: defaultInputSize,
      },
    },
    NumberInput: {
      defaultProps: {
        size: defaultInputSize,
      },
    },
    Textarea: {
      defaultProps: {
        size: defaultInputSize,
      },
    },
    PasswordInput: {
      defaultProps: {
        size: defaultInputSize,
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
