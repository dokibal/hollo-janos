import { companyName } from "./constants";
import HomePage from "./main/home-page";
import LandingPage from "./main/landing-page";
import { businessStructuredData, createPageMetadata } from "./seo";

export const metadata = createPageMetadata({
  title: `${companyName} - Villanyszerelő Tatabányán és környékén`,
  description:
    "Megbízható villanyszerelő Tatabányán és környékén. Lakossági és ipari villanyszerelés gyors, precíz és szakszerű kivitelezéssel.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage>
        <LandingPage />
      </HomePage>
    </>
  );
}
