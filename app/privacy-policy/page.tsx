import { Box, Text } from "@chakra-ui/react";

export default function PrivacyPolicy() {
  return (
    <Box
      minH={{ base: "auto", md: "100vh" }}
      p="2em"
      bg="white"
      color="secondary"
      overflow="auto"
    >
      <Text>
        Adatkezelési tájékoztató 1. Az adatkezelő adatai Név / Cégnév: [A te
        neved vagy céged neve] Székhely / cím: [Cím vagy székhely] E-mail: [Az
        az e-mail cím, amin keresztül az ajánlatkéréseket fogadod] Telefon:
        [Opcionális] 2. Az adatkezelés célja Az ajánlatkérő űrlap kitöltésével
        Ön lehetőséget kap arra, hogy kapcsolatba lépjen velünk és árajánlatot
        kérjen szolgáltatásainkra. A megadott adatokat kizárólag az ajánlatkérés
        feldolgozásához és megválaszolásához használjuk fel. 3. A kezelt adatok
        köre Az űrlapon megadott adatok: Név (kötelező), E-mail cím (kötelező),
        Telefonszám (opcionális), Az üzenet szövege. 4. Az adatkezelés jogalapja
        Az adatkezelés jogalapja az Érintett hozzájárulása (GDPR 6. cikk (1) a)
        pont). A hozzájárulást az űrlap önkéntes kitöltésével és elküldésével
        adja meg. 5. Az adatok tárolása és továbbítása A megadott adatok nem
        kerülnek adatbázisba mentésre, kizárólag e-mail formájában jutnak el az
        adatkezelőhöz. Az e-maileket az ajánlatkérés lezárását követően
        töröljük, és az adatokat nem adjuk tovább harmadik félnek. 6. Az
        érintett jogai Ön bármikor jogosult: tájékoztatást kérni az Önről kezelt
        adatokról, kérni azok helyesbítését vagy törlését, a hozzájárulását
        visszavonni. Ezekkel kapcsolatban az adatkezelő elérhetőségein keresztül
        kérhet tájékoztatást vagy intézkedést. 7. Panasztételi jog Ha úgy érzi,
        hogy adataival kapcsolatban jogsérelem érte, panaszt tehet a Nemzeti
        Adatvédelmi és Információszabadság Hatóságnál (NAIH) Cím: 1055 Budapest,
        Falk Miksa utca 9–11. Honlap: https://www.naih.hu 8. Az adatkezelési
        tájékoztató módosítása Az adatkezelő fenntartja a jogot, hogy a
        tájékoztatót a jogszabályoknak megfelelően bármikor módosítsa. Az
        aktuális verzió mindig elérhető a weboldalon.
      </Text>
    </Box>
  );
}
