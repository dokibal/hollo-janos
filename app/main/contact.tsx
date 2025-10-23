import {
  Box,
  GridItem,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  email,
  emailLink,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
} from "../constants";
import Form from "./form";
import { FaFacebook } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact">
      <Box minH={{ base: "auto", md: "100vh" }} p="2em" overflow="auto">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="2em">
          <GridItem display="flex" alignItems="center">
            <VStack
              display="flex"
              justifyContent="left"
              bg="white"
              borderRadius="2em"
              width="100%"
              paddingTop="5em"
              paddingBottom="5em"
              boxShadow="lg"
            >
              <Heading mb="2em">Vegye fel velünk a kapcsolatot!</Heading>
              <Text fontSize="xl">
                📞{" "}
                <Link
                  href={phoneNumberLink}
                  _hover={{ textDecoration: "none" }}
                  fontSize="xl"
                >
                  {phoneNumber}
                </Link>
                (H-P 8:00-17:00)
              </Text>
              <Text fontSize="xl">
                ✉️{" "}
                <Link
                  href={emailLink}
                  _hover={{ textDecoration: "none" }}
                  fontSize="xl"
                >
                  {email}
                </Link>
              </Text>
              <Text fontSize="xl">
                <Icon>
                  <FaFacebook />
                </Icon>{" "}
                <Link
                  href={facebookLink}
                  target="_blank"
                  _hover={{ textDecoration: "none" }}
                  fontSize="xl"
                >
                  Holló-Vill Villanyszerelés
                </Link>
              </Text>
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
