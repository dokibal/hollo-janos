import {
  Box,
  GridItem,
  Heading,
  HStack,
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
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="2em">
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            display="flex"
            alignItems="center"
          >
            <VStack
              display="flex"
              justifyContent="left"
              bg="white"
              borderRadius="2em"
              width="100%"
              paddingTop="5em"
              paddingBottom="5em"
              boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.2)"
              fontSize="xl"
              padding="2em 1em 2em 1em"
            >
              <Box display="flex" justifyContent="left" width="100%">
                <Heading marginBottom="2em" size="lg">
                  Vegye fel velünk a kapcsolatot!
                </Heading>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="left"
                gap="1em"
              >
                <Text>
                  📞{" "}
                  <Link
                    href={phoneNumberLink}
                    _hover={{ textDecoration: "none" }}
                  >
                    {phoneNumber}{" "}
                  </Link>
                  (H-P 8:00-17:00)
                </Text>
                <Text>
                  ✉️{" "}
                  <Link href={emailLink} _hover={{ textDecoration: "none" }}>
                    {email}
                  </Link>
                </Text>
                <HStack>
                  <Icon size="lg" color="#1877F2">
                    <FaFacebook />
                  </Icon>{" "}
                  <Link
                    href={facebookLink}
                    target="_blank"
                    _hover={{ textDecoration: "none" }}
                  >
                    Holló-Vill Villanyszerelés
                  </Link>
                </HStack>
              </Box>
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Form />
          </GridItem>
        </SimpleGrid>
      </Box>
    </section>
  );
}
