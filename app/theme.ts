import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#023e8a" },
        primaryDark: { value: "#001a3dff" },
        accent: { value: "#FF7A00" },
        secondary: { value: "#6C757D" },
        background: { value: "#F5F5F5" },
      },
    },
  },
});

export const customSystem = createSystem(defaultConfig, config);
