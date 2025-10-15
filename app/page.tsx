// TODO: put back "use client";

import { Box } from "@chakra-ui/react";
import Services from "./modules/services";
import Contact from "./modules/contact";
import About from "./modules/about";
import Header from "./modules/header";
import Footer from "./modules/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fejlesztés alatt",
  robots: {
    index: false,
    follow: false,
  },
};

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
