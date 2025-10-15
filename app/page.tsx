"use client";

import { Box } from "@chakra-ui/react";
import Services from "./modules/services";
import Contact from "./modules/contact";
import About from "./modules/about";
import Header from "./modules/header";
import Footer from "./modules/footer";

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
