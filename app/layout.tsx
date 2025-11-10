"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { companyName } from "./constants";
import "./globals.css";
import { customSystem } from "./theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <link
          rel="preload"
          href="/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
        />
        <meta
          name="description"
          content={`${companyName}: Megbízható villanyszerelés Tatabányán és környékén. Lakossági és ipari villanyszerelési szolgáltatások gyors, szakszerű kivitelezéssel.`}
        />
        <title>{`${companyName} | Villanyszerelés Tatabánya környékén`}</title>
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
