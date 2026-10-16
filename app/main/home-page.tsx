"use client";

import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import MobileContactBar from "../components/mobile-contact-bar";
import About from "./about";
import Contact from "./contact";
import Services from "./services";

export default function HomePage({ children }: { children: ReactNode }) {
  return (
    <Box as="main" position="relative" bg="#FAFAF8">
      {children}
      <About />
      <Services />
      <Contact />
      <MobileContactBar />
    </Box>
  );
}
