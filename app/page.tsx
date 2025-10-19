"use client";

import { Box } from "@chakra-ui/react";
import Services from "./main/services";
import Contact from "./main/contact";
import About from "./main/about";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Page() {
  return (
    <Box>
      <About />
      <Services />
      <Contact />
    </Box>
  );
}
