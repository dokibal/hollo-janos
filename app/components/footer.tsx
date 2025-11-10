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
              href={phoneNumberLink}
              color="inherit"
              textDecoration="none"
              outline="none"
            >
              <Icon size="sm" color="inherit">
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
            >
              <Icon size="sm" color="inherit">
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
            >
              <Icon size={{ base: "sm", md: "md" }} color="inherit">
                <FaFacebookF />
              </Icon>{" "}
              {facebook}
            </ChakraLink>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <ChakraLink
              display="flex"
              color="inherit"
              as={Link}
              href="/privacy-policy"
              target="_blank"
              textDecoration="underline"
              outline="none"
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
            >
              Impresszum
            </ChakraLink>
            <Text color="inherit">© 2025 {companyName}</Text>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}
