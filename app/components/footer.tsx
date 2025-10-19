import { Flex, Text, HStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import {
  companyName,
  email,
  emailLink,
  phoneNumber,
  phoneNumberLink,
} from "../constants";

export default function Footer() {
  return (
    <Flex bg="white" p={4} justify="center">
      <HStack gap="2em">
        <ChakraLink
          color="secondary"
          href={phoneNumberLink}
          _hover={{ textDecoration: "none" }}
        >
          📞 {phoneNumber}
        </ChakraLink>
        <ChakraLink
          color="secondary"
          href={emailLink}
          _hover={{ textDecoration: "none" }}
        >
          ✉️ {email}
        </ChakraLink>
        <Text>© 2025 {companyName}</Text>
        <Text>
          <Link href="/privacy-policy">Adatkezelési tájékoztató</Link>
        </Text>
      </HStack>
    </Flex>
  );
}
