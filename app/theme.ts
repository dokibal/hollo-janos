import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#0F1113" },
        primaryDark: { value: "#000000" },
        accent: { value: "#FFD100" },
        textWhite: { value: "#F5F5F5" },
        secondary: { value: "#6C757D" },
      },
    },
  },
});

export const customSystem = createSystem(defaultConfig, config);
