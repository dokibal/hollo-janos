"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import Footer from "./components/footer";
import ContactAnalytics from "./components/contact-analytics";
import Header from "./components/header";
import { customSystem } from "./theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={customSystem}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        // Run the theme bootstrap during HTML parsing; effects handle client updates.
        scriptProps={{
          type: typeof window === "undefined" ? "text/javascript" : "text/plain",
        }}
      >
        <ContactAnalytics />
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </ChakraProvider>
  );
}
