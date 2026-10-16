import { Box, Heading, Text } from "@chakra-ui/react";
import { address, companyOwner, email, phoneNumber } from "../constants";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Impresszum | Holló-Vill",
  description:
    "A Holló-Vill weboldal üzemeltetőjének, Holló János egyéni vállalkozónak az adatai és elérhetőségei.",
  path: "/imprint",
});

export default function Imprint() {
  return (
    <Box
      as="main"
      minH={{ base: "auto", md: "100vh" }}
      padding="clamp(1rem, 4vw, 3rem)"
      pt="4em"
      bg="white"
      color="secondary"
      textStyle={{ base: "md", md: "lg" }}
    >
      <Box>
        <Heading
          as="h1"
          textStyle={{ base: "lg", md: "2xl" }}
          marginBottom="1em"
        >
          Impresszum
        </Heading>
        <Text fontWeight="bold">A weboldal üzemeltetője</Text>
        <Text>
          {companyOwner} <br />
          (Egyéni vállalkozó)
        </Text>
        <Text fontWeight="bold">Székhely:</Text> <Text>{address}</Text>
        <Text fontWeight="bold">Nyilvántartási szám:</Text>
        <Text>61200405</Text>
        <Text fontWeight="bold">Adószám:</Text> <Text>91465126-1-31</Text>
        <Text fontWeight="bold">E-mail:</Text> <Text>{email}</Text>
        <Text fontWeight="bold">Telefon:</Text>
        <Text>{phoneNumber}</Text>
        <Text fontWeight="bold">A tevékenység jellege:</Text>
        <Text>432101 - Egyéb villanyszerelés</Text>
        <Text fontWeight="bold">Kamarai tagság:</Text>
        <Text>Komárom-Esztergom Vármegyei Kereskedelmi és Iparkamara</Text>
        <Text fontWeight="bold">Kamarai nyilvántartási száma:</Text>
        <Text>KO91465126</Text>
        <Text fontWeight="bold">Adózási forma:</Text>
        <Text>Alanyi adómentes</Text>
      </Box>
    </Box>
  );
}
