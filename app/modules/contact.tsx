import {
  Box,
  GridItem,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Element } from "react-scroll";
import { email, emailLink, phoneNumber, phoneNumberLink } from "../constants";
import Form from "./form";

export default function Contact() {
  return (
    <Element name="contact">
      <Box minH="100vh" p="2em" bg="white" color="secondary">
        <Heading mb="2em">Vedd fel velünk a kapcsolatot!</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <GridItem
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <SimpleGrid columns={2} gap="1em">
              <GridItem>
                <VStack display="flex" alignItems="flex-start">
                  <Text fontSize="2xl">📞 Hívjon most </Text>
                  <Text fontSize="2xl">⏱️ Hívható </Text>
                  <Text fontSize="2xl">✉️ Írjon nekunk </Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack display="flex" alignItems="flex-start">
                  <Link
                    color="secondary"
                    href={phoneNumberLink}
                    _hover={{ textDecoration: "none" }}
                    fontSize="2xl"
                  >
                    {phoneNumber}
                  </Link>
                  <Text fontSize="2xl">H-P 8:00-17:00</Text>
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
            </SimpleGrid>
          </GridItem>
          <GridItem>
            <Form />
          </GridItem>
        </SimpleGrid>
      </Box>
    </Element>
  );
}
