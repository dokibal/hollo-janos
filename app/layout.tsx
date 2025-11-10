"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { companyName } from "./constants";
import "./globals.css";
import { customSystem } from "./theme";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu" className={roboto.className}>
      <head>
        <meta
          name="description"
          content={`${companyName}: Megbízható villanyszerelés Tatabányán és környékén. Lakossági és ipari villanyszerelési szolgáltatások gyors, szakszerű kivitelezéssel.`}
        />
        <title>{`${companyName} | Villanyszerelés Tatabányán és környékén`}</title>
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
