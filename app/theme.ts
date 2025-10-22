import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#000000" },
        primaryDark: { value: "#000000" },
        accent: { value: "#FFD100" },
        secondary: { value: "#6C757D" },
        background: { value: "#F5F5F5" },
      },
    },
  },
});

export const customSystem = createSystem(defaultConfig, config);
