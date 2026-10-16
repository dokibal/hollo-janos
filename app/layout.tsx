import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { companyName, siteUrl } from "./constants";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: companyName,
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu" className={roboto.className} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-QBNRJVW5VH" />
      </body>
    </html>
  );
}
