import { Box, Heading, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { email, phoneNumber } from "../constants";

type PrivacyPolicySectionProps = {
  index: number;
  title: string;
  children: JSX.Element;
};

const PrivacyPolicySection = ({
  index,
  title,
  children,
}: Readonly<PrivacyPolicySectionProps>) => {
  return (
    <Box pt="0.5em" pb="0.5em" textAlign="justify">
      <Heading size="md">{`${index}. ${title}`}</Heading>
      {children}
    </Box>
  );
};

export default function PrivacyPolicy() {
  return (
    <Box
      minH={{ base: "auto", md: "100vh" }}
      p="2em"
      pt="4em"
      bg="white"
      color="secondary"
      overflow="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Heading>Adatkezelési tájékoztató </Heading>
        <PrivacyPolicySection index={1} title="Az adatkezelő adatai">
          <Text>
            Cégnév: Holló János e.v. <br />
            Székhely: 2851 Környe November utca <br />
            E-mail: {email} <br />
            Telefon: {phoneNumber}
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection index={2} title="Az adatkezelés célja">
          <Text>
            Az ajánlatkérő űrlap kitöltésével Ön lehetőséget kap arra, hogy
            kapcsolatba lépjen velünk és árajánlatot kérjen szolgáltatásainkra.
            A megadott adatokat kizárólag az ajánlatkérés feldolgozásához és
            megválaszolásához használjuk fel.
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection index={3} title="A kezelt adatok köre">
          <Text>
            Az űrlapon megadott adatok: név, e-mail cím, telefonszám
            (opcionális), település, az üzenet szövege.
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection index={4} title="Az adatkezelés jogalapja">
          <Text>
            Az adatkezelés jogalapja az Érintett hozzájárulása (GDPR 6. cikk (1)
            a) pont). A hozzájárulást az űrlap önkéntes kitöltésével és
            elküldésével adja meg.
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection
          index={5}
          title="Az adatok tárolása és
        továbbítása"
        >
          <Text>
            A megadott adatok nem kerülnek adatbázisba mentésre, kizárólag
            e-mail formájában jutnak el az adatkezelőhöz. Az e-maileket az
            ajánlatkérés lezárását követően töröljük, és az adatokat nem adjuk
            tovább harmadik félnek.
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection index={6} title="Az érintett jogai">
          <Text>
            Ön bármikor jogosult: tájékoztatást kérni az Önről kezelt adatokról,
            kérni azok helyesbítését vagy törlését, a hozzájárulását
            visszavonni. Ezekkel kapcsolatban az adatkezelő elérhetőségein
            keresztül kérhet tájékoztatást vagy intézkedést.
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection index={7} title="Panasztételi jog">
          <Text>
            Ha úgy érzi, hogy adataival kapcsolatban jogsérelem érte, panaszt
            tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál
            (NAIH).
            <br />
            Cím: 1055 Budapest, Falk Miksa utca 9–11. <br />
            Honlap: https://www.naih.hu
          </Text>
        </PrivacyPolicySection>

        <PrivacyPolicySection
          index={8}
          title="Az adatkezelési tájékoztató módosítása"
        >
          <Text>
            Az adatkezelő fenntartja a jogot, hogy a tájékoztatót a
            jogszabályoknak megfelelően bármikor módosítsa. Az aktuális verzió
            mindig elérhető a weboldalon.
          </Text>
        </PrivacyPolicySection>
      </Box>
    </Box>
  );
}
