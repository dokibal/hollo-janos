"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { companyName, siteUrl } from "./constants";
import "./globals.css";
import { customSystem } from "./theme";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const title: string = `${companyName} | Villanyszerelés Tatabányán és környékén`;
  const description: string = `${companyName}: Megbízható villanyszerelés Tatabányán és környékén. Lakossági és ipari villanyszerelési szolgáltatások gyors, szakszerű kivitelezéssel.`;

  return (
    <html lang="hu" className={roboto.className}>
      <head>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/company_logo.webp`} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <title>{title}</title>
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
