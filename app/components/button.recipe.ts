import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "accent",
    background: "accent",
    color: "primary",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.25em",
    padding: "0.5em",
    cursor: "pointer",

    _hover: { background: "accentDark", fontWeight: "bolder", color: "white" },

    _disabled: {
      background: "secondary",
      borderColor: "secondary",
      color: "textWhite",
      cursor: "not-allowed",
      _hover: { bg: "gray.400" },
    },
  },
});
