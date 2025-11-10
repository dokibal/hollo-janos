import { Box, Heading, Text } from "@chakra-ui/react";
import { address, companyOwner, email, phoneNumber } from "../constants";

export default function PrivacyPolicy() {
  return (
    <Box
      minH={{ base: "auto", md: "100vh" }}
      padding="clamp(1rem, 4vw, 3rem)"
      pt="4em"
      bg="white"
      color="secondary"
      textStyle={{ base: "md", md: "lg" }}
    >
      <Box>
        <Heading textStyle={{ base: "lg", md: "2xl" }} marginBottom="2em">
          Impresszum
        </Heading>
        <Text fontWeight="bold">A weboldal üzemeltetője</Text>
        <Text>
          {companyOwner} <br />
          (Egyéni vállalkozó)
        </Text>
        <Text fontWeight="bold"> Székhely:</Text> <Text>{address}</Text>
        <Text fontWeight="bold">Nyilvántartási szám:</Text>
        <Text>12345678</Text>
        <Text fontWeight="bold">Adószám:</Text> <Text>12345678-1-42</Text>
        <Text fontWeight="bold">E-mail:</Text> <Text>{email}</Text>
        <Text fontWeight="bold">Telefon:</Text>
        <Text>{phoneNumber}</Text>
        <Text fontWeight="bold"> A tevékenység jellege:</Text>
        <Text>Villanyszerelési és karbantartási szolgáltatások</Text>
        <Text fontWeight="bold">Kamarai tagság:</Text>
        <Text>Budapesti Kereskedelmi és Iparkamara tagja </Text>
        <Text fontWeight="bold">Adózási forma:</Text>
        <Text>Alanyi adómentes</Text>
      </Box>
    </Box>
  );
}
