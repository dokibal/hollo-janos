import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    bg: "accent",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.25em",
    padding: "0.5em",
    cursor: "pointer",
  },
});
