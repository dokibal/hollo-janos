"use client";

import { Box } from "@chakra-ui/react";
import LandingPage from "./main/landing-page";

export default function Page() {
  return (
    <Box position="relative">
      <Box minH="100vh" overflow="hidden">
        <LandingPage />
        <LandingPage />
        <LandingPage />
        <LandingPage />
        <LandingPage />
        <Box position="absolute" inset="0" zIndex={0}>
          <Box
            position="absolute"
            inset="0"
            bgImage="url('/background.svg')"
            bgRepeat="repeat"
            bgSize="200px"
            bgColor="white"
          />
          <Box position="absolute" inset="0" bg="rgba(255,255,255,0.8)" />
        </Box>
        {/* <Box position="relative" zIndex={1}>
          <About />
          <Box
            h="7em"
            bgImage="linear-gradient(to bottom, white, rgba(0,0,0,1))"
            opacity={0.4}
          ></Box>
          <Services />
          <Box
            h="7em"
            bgImage="linear-gradient(to bottom, rgba(0,0,0,1), white)"
            opacity={0.4}
          ></Box>
          <Contact />
        </Box> */}
      </Box>
    </Box>
  );
}
