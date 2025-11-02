"use client";

import { Box } from "@chakra-ui/react";
import Services from "./main/services";
import Contact from "./main/contact";
import About from "./main/about";

export default function Page() {
  return (
    <Box position="relative">
      <Box minH="100vh" overflow="hidden">
        <Box
          position="absolute"
          inset="0"
          bgImage="url('/background.svg')"
          bgRepeat="repeat"
          bgSize="200px"
          bgColor="white"
          bgBlendMode="multiply"
          opacity={0.25}
          zIndex={0}
        />
        <Box position="relative" zIndex={1}>
          <About />
          <Box
            h="100px"
            bgImage="linear-gradient(to bottom, white, rgba(0,0,0,1))"
            opacity={0.4}
          ></Box>
          <Services />
          <Box
            h="100px"
            bgImage="linear-gradient(to bottom, rgba(0,0,0,1), white)"
            opacity={0.4}
          ></Box>
          <Contact />
        </Box>
      </Box>
    </Box>
  );
}
