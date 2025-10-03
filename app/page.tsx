"use client";

import { Box } from "@chakra-ui/react";
import Services from "./components/services";
import Contact from "./components/contact";
import About from "./components/about";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Page() {
  return (
    <Box>
      <Header />
      <About />
      <Services />
      <Contact />
      <Footer />
    </Box>
  );
}
