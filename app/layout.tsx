"use client";

import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { customSystem } from "./theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <ChakraProvider value={customSystem}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
