"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { customSystem } from "./theme";
import Header from "./components/header";
import Footer from "./components/footer";
import { companyName } from "./constants";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <title>{`${companyName}`}</title>
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
      <GoogleAnalytics gaId="G-QBNRJVW5VH" />
    </html>
  );
}
