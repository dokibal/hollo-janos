import {
  Flex,
  Text,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  GridItem,
  Box,
} from "@chakra-ui/react";
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
    <Flex
      bg="primaryDark"
      p="0.5em"
      color="white"
      fontWeight="light"
      fontSize="small"
      justify="center"
    >
      <SimpleGrid columns={{ base: 2, md: 4 }} spaceX={2}>
        <GridItem marginInlineStart="0 !important">
          <ChakraLink
            color="inherit"
            href={phoneNumberLink}
            _hover={{ textDecoration: "none" }}
          >
            📞 {phoneNumber}
          </ChakraLink>
        </GridItem>
        <GridItem marginInlineStart="0 !important">
          <ChakraLink
            color="inherit"
            href={emailLink}
            _hover={{ textDecoration: "none" }}
          >
            ✉️ {email}
          </ChakraLink>
        </GridItem>
        <GridItem marginInlineStart="0 !important">
          <Text>© 2025 {companyName}</Text>
        </GridItem>
        <GridItem marginInlineStart="0 !important">
          <Text>
            <Link href="/privacy-policy" target="_blank">
              Adatkezelési tájékoztató
            </Link>
          </Text>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
}
