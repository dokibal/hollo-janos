import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "8px",
    borderColor: "#A5A9AC",
    background: "white",
    outline: "none",
    _focus: {
      borderColor: "primary",
    },
    width: "100%",
    minHeight: "48px",
    fontSize: "16px",
    padding: "10px 12px",
    _focusVisible: { outline: "3px solid #B39200", outlineOffset: "3px" },
  },
});
