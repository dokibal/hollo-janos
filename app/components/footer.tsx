import {
  Flex,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  GridItem,
  Icon,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  companyName,
  email,
  emailLink,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
} from "../constants";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    <VStack
      bg="primaryDark"
      p="0.5em"
      color="textWhite"
      fontWeight="light"
      fontSize="sm"
      justify="center"
    >
      <SimpleGrid columns={2} gap="1em">
        <GridItem>
          <VStack>
            <ChakraLink
              as={Link}
              color="inherit"
              href={phoneNumberLink}
              _hover={{ textDecoration: "none" }}
            >
              <Icon size="sm" color="red">
                <FaPhoneAlt />
              </Icon>{" "}
              {phoneNumber}
            </ChakraLink>

            <ChakraLink
              as={Link}
              color="inherit"
              href={facebookLink}
              _hover={{ textDecoration: "none" }}
            >
              <Icon size={{ base: "sm", md: "md" }}>
                <FaFacebookF />
              </Icon>{" "}
              {facebook}
            </ChakraLink>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <ChakraLink
              as={Link}
              color="inherit"
              href={emailLink}
              _hover={{ textDecoration: "none" }}
            >
              <Icon size="sm" color="white">
                <MdOutlineEmail />
              </Icon>{" "}
              {email}
            </ChakraLink>
            <ChakraLink
              display="flex"
              color="textWhite"
              as={Link}
              href="/privacy-policy"
              target="_blank"
              textDecoration="underline"
            >
              Adatkezelési tájékoztató
            </ChakraLink>
          </VStack>
        </GridItem>
      </SimpleGrid>
      <Text>© 2025 {companyName}</Text>
    </VStack>
  );
}
