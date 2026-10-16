import type { Metadata } from "next";
import {
  companyName,
  companyOwner,
  email,
  facebookLink,
  phoneNumber,
  siteUrl,
} from "./constants";
import { locations } from "./locations";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "hu_HU",
      siteName: companyName,
      images: [{ url: "/company_logo.webp", alt: companyName }],
    },
  };
}

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${siteUrl}/#business`,
  name: companyName,
  legalName: companyOwner,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/company_logo.webp`,
  image: `${siteUrl}/profile.webp`,
  telephone: phoneNumber.replace(/\s/g, ""),
  email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "November utca 20.",
    addressLocality: "Környe",
    postalCode: "2851",
    addressCountry: "HU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: Array.from(locations.values())
    .flat()
    .map((name) => ({
      "@type": "Place",
      name,
    })),
  sameAs: [facebookLink],
};
