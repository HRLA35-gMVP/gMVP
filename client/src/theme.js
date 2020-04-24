import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#BEEBE9",
      800: "#F5DADB",
      700: "#FFB6BA",
      600: "#F7EEC7"
    },
  },
};

export default customTheme;