import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "8px",
    borderColor: "#A5A9AC",
    background: "white",
    color: "primary",
    // These white fields need light native controls even under a dark system theme.
    colorScheme: "light",
    WebkitTextFillColor: "#0F1113",
    caretColor: "primary",
    // Browsers enforce their autofill background; an inset shadow covers it.
    "&:is(:autofill, :-webkit-autofill)": {
      boxShadow: "0 0 0 1000px white inset",
    },
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
