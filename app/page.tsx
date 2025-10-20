"use client";

import { Box } from "@chakra-ui/react";
import Services from "./main/services";
import Contact from "./main/contact";
import About from "./main/about";

export default function Page() {
  return (
    <Box>
      <About />
      <Services />
      <Contact />
    </Box>
  );
}
