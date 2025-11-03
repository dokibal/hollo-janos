import {
  Flex,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  GridItem,
  Icon,
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
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    <Flex
      bg="primaryDark"
      p="0.5em"
      color="textWhite"
      fontWeight="light"
      fontSize="small"
      justify="center"
    >
      <SimpleGrid columns={{ base: 2, md: 5 }} gapX="1em">
        <GridItem>
          <ChakraLink
            color="inherit"
            href={phoneNumberLink}
            _hover={{ textDecoration: "none" }}
          >
            <Icon size="sm" color="red">
              <FaPhoneAlt />
            </Icon>{" "}
            {phoneNumber}
          </ChakraLink>
        </GridItem>
        <GridItem>
          <ChakraLink
            color="inherit"
            href={emailLink}
            _hover={{ textDecoration: "none" }}
          >
            <Icon size="sm" color="white">
              <MdOutlineEmail />
            </Icon>{" "}
            {email}
          </ChakraLink>
        </GridItem>
        <GridItem>
          <ChakraLink
            color="inherit"
            href={facebookLink}
            _hover={{ textDecoration: "none" }}
          >
            <Icon size="sm" color="#1877F2">
              <FaFacebook />
            </Icon>{" "}
            {facebook}
          </ChakraLink>
        </GridItem>
        <GridItem>
          <Text>
            <Link href="/privacy-policy" target="_blank">
              Adatkezelési tájékoztató
            </Link>
          </Text>
        </GridItem>
        <GridItem>
          <Text>© 2025 {companyName}</Text>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
}
