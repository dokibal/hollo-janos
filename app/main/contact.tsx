import {
  Box,
  GridItem,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { email, emailLink, phoneNumber, phoneNumberLink } from "../constants";
import Form from "./form";

export default function Contact() {
  return (
    <section id="contact">
      <Box
        minH={{ base: "auto", md: "100vh" }}
        p="2em"
        color="secondary"
        overflow="auto"
      >
        <Heading mb="2em">Vedd fel velünk a kapcsolatot!</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <GridItem
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <VStack>
              <Heading fontSize="2xl">📞 Hívjon most </Heading>
              <HStack>
                <Link
                  color="secondary"
                  href={phoneNumberLink}
                  _hover={{ textDecoration: "none" }}
                  fontSize="2xl"
                >
                  {phoneNumber}
                </Link>
                <Text fontSize="2xl">⏱️ Hívható: H-P 8:00-17:00 </Text>
              </HStack>
              <Heading fontSize="2xl">✉️ Írjon nekünk </Heading>
              <Link
                color="secondary"
                href={emailLink}
                _hover={{ textDecoration: "none" }}
                fontSize="2xl"
              >
                {email}
              </Link>
            </VStack>
          </GridItem>
          <GridItem>
            <Form />
          </GridItem>
        </SimpleGrid>
      </Box>
    </section>
  );
}
