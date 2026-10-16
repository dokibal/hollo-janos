import {
  Link as ChakraLink,
  GridItem,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import {
  companyName,
  email,
  emailLink,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
} from "../constants";

export default function Footer() {
  return (
    <VStack
      as="footer"
      bg="primaryDark"
      py="32px"
      color="textWhite"
      fontWeight="normal"
      fontSize="md"
      align="stretch"
      gap="24px"
    >
      <SimpleGrid className="site-container" columns={{ base: 1, md: 2 }} gap="24px">
        <GridItem>
          <VStack align={{ base: "center", md: "start" }} gap="4px">
            <ChakraLink
              as={Link}
              href={phoneNumberLink}
              color="inherit"
              textDecoration="none"
              outline="none"
              minH={{ base: "44px", md: "32px" }}
              px="8px"
              gap="10px"
              justifyContent="center"
              textAlign="center"
            >
              <Icon boxSize="16px" flexShrink={0} color="inherit" aria-hidden="true">
                <FaPhoneAlt />
              </Icon>{" "}
              {phoneNumber}
            </ChakraLink>
            <ChakraLink
              as={Link}
              href={emailLink}
              color="inherit"
              textDecoration="none"
              outline="none"
              minH={{ base: "44px", md: "32px" }}
              px="8px"
              gap="10px"
              justifyContent="center"
              textAlign="center"
            >
              <Icon boxSize="16px" flexShrink={0} color="inherit" aria-hidden="true">
                <MdOutlineEmail />
              </Icon>{" "}
              {email}
            </ChakraLink>
            <ChakraLink
              as={Link}
              href={facebookLink}
              color="inherit"
              textDecoration="none"
              outline="none"
              minH={{ base: "44px", md: "32px" }}
              px="8px"
              gap="10px"
              justifyContent="center"
              textAlign="center"
            >
              <Icon boxSize="16px" flexShrink={0} color="inherit" aria-hidden="true">
                <FaFacebookF />
              </Icon>{" "}
              {facebook}
            </ChakraLink>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack
            as="nav"
            aria-label="Jogi információk"
            align={{ base: "center", md: "end" }}
            gap="4px"
            borderTop={{ base: "1px solid rgba(255,255,255,0.16)", md: "none" }}
            pt={{ base: "24px", md: "0" }}
            fontSize="sm"
          >
            <ChakraLink
              display="flex"
              color="inherit"
              as={Link}
              href="/privacy-policy"
              target="_blank"
              textDecoration="underline"
              outline="none"
              minH={{ base: "44px", md: "32px" }}
              px="8px"
              textAlign="center"
            >
              Adatkezelési tájékoztató
            </ChakraLink>
            <ChakraLink
              display="flex"
              color="inherit"
              as={Link}
              href="/imprint"
              target="_blank"
              textDecoration="underline"
              outline="none"
              minH={{ base: "44px", md: "32px" }}
              px="8px"
              textAlign="center"
            >
              Impresszum
            </ChakraLink>
          </VStack>
        </GridItem>
      </SimpleGrid>
      <Text
        className="site-container"
        color="#A5A9AC"
        fontSize="sm"
        lineHeight="1.5"
        textAlign={{ base: "center", md: "right" }}
      >
        © 2025 {companyName}
      </Text>
    </VStack>
  );
}
