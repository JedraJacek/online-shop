import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("white", "gray.800")(props),
      color: mode("gray.800", "white")(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
