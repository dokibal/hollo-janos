import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    bg: "accent",
    color: "primary",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.25em",
    padding: "0.5em",
    cursor: "pointer",

    _hover: { fontWeight: "bolder", color: "white" },

    _disabled: {
      bg: "gray.400",
      color: "gray.700",
      cursor: "not-allowed",
      _hover: { bg: "gray.400" },
    },
  },
});
