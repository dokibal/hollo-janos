import { Flex, HStack, Link } from "@chakra-ui/react";
import { email, emailLink, phoneNumber, phoneNumberLink } from "../constants";

export default function Footer() {
  return (
    <Flex bg="white" p={4} justify="center">
      <HStack gap="2em">
        <Link
          color="secondary"
          href={phoneNumberLink}
          _hover={{ textDecoration: "none" }}
        >
          📞 {phoneNumber}
        </Link>
        <Link
          color="secondary"
          href={emailLink}
          _hover={{ textDecoration: "none" }}
        >
          ✉️ {email}
        </Link>
      </HStack>
    </Flex>
  );
}
