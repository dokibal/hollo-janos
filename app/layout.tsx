"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { customSystem } from "./theme";
import Header from "./components/header";
import Footer from "./components/footer";
import { companyName } from "./constants";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <title>{`${companyName}`}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ChakraProvider value={customSystem}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
