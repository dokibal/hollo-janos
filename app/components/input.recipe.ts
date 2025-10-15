import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "0.25em",
    borderColor: "primary",
    bg: "white",
    outline: "none",
    _focus: {
      borderColor: "accent",
    },
    width: "100%",
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  },
});
