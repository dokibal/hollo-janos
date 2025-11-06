import {
  Box,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import {
  email,
  emailLink,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
} from "../constants";
import Form from "./form";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Contact() {
  return (
    <section id="contact">
      <Box
        scrollMarginTop="2em"
        minH={{ base: "auto", md: "100vh" }}
        p="2em"
        overflow="auto"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="2em">
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            display="flex"
            alignItems="center"
          >
            <VStack
              display="flex"
              justifyContent="left"
              bgColor="primary"
              color="textWhite"
              borderRadius="1em"
              width="100%"
              paddingTop="5em"
              paddingBottom="5em"
              boxShadow="0 4px 20px 0 rgba(15, 17, 19, 0.7), 0 4px 20px 0 rgba(15, 17, 19, 0.7)"
              fontSize={{ base: "md", md: "lg" }}
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
                <HStack gap="1em">
                  <Icon size="md" color="red">
                    <FaPhoneAlt />
                  </Icon>
                  <Link
                    href={phoneNumberLink}
                    _hover={{ textDecoration: "none" }}
                    color="textWhite"
                  >
                    {phoneNumber}
                    {" (H-P 8:00-17:00)"}
                  </Link>
                </HStack>
                <HStack gap="1em">
                  <Icon size="lg" color="textWhite">
                    <MdOutlineEmail />
                  </Icon>
                  <Link
                    href={emailLink}
                    _hover={{ textDecoration: "none" }}
                    color="textWhite"
                  >
                    {email}
                  </Link>
                </HStack>
                <HStack gap="1em">
                  <Icon size="lg" color="blue">
                    <FaFacebook />
                  </Icon>
                  <Link
                    href={facebookLink}
                    target="_blank"
                    _hover={{ textDecoration: "none" }}
                    color="textWhite"
                  >
                    {facebook}
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
