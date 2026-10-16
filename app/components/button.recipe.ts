import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "accent",
    background: "accent",
    color: "primary",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    minHeight: "48px",
    padding: "12px 20px",
    whiteSpace: "normal",
    textAlign: "center",
    lineHeight: "1.4",
    cursor: "pointer",
    fontSize: "md",
    transition:
      "background-color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease",

    _hover: { background: "#E6BD00", borderColor: "#E6BD00", color: "primary" },
    _focusVisible: { outline: "3px solid #B39200", outlineOffset: "4px" },
    "@media (hover: hover) and (pointer: fine)": {
      _hover: {
        transform: "translateY(-2px)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.16)",
      },
    },
    _active: { transform: "translateY(0)", boxShadow: "none" },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      _hover: { transform: "none" },
      _active: { transform: "none" },
    },

    _disabled: {
      background: "secondary",
      borderColor: "secondary",
      color: "textWhite",
      cursor: "not-allowed",
      _hover: { bg: "gray.400", transform: "none", boxShadow: "none" },
    },
  },
});
