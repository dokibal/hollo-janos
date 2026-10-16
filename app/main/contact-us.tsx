import { HStack, Icon, Link, SimpleGrid } from "@chakra-ui/react";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import {
  email,
  emailLink,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
} from "../constants";
import { MdOutlineEmail } from "react-icons/md";
import ContactBlock from "./contact-block";

export default function ContactUs() {
  return (
    <ContactBlock title="Vegye fel velünk a kapcsolatot!" color="primary">
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        gap={{ base: "16px", lg: "24px" }}
        fontSize={{ base: "md", md: "lg" }}
        width="100%"
      >
        <HStack gap="16px" align="start">
          <Icon size="md" color="accent" flexShrink={0} mt="12px">
            <FaPhoneAlt />
          </Icon>
          <Link
            href={phoneNumberLink}
            _hover={{ textDecoration: "none" }}
            color="textWhite"
            minH="44px"
            lineHeight="1.6"
            overflowWrap="anywhere"
          >
            {phoneNumber}
            {" (H-P 8:00-17:00)"}
          </Link>
        </HStack>
        <HStack gap="16px" align="start">
          <Icon size="lg" color="textWhite" flexShrink={0} mt="10px">
            <MdOutlineEmail />
          </Icon>
          <Link
            href={emailLink}
            _hover={{ textDecoration: "none" }}
            color="textWhite"
            minH="44px"
            overflowWrap="anywhere"
          >
            {email}
          </Link>
        </HStack>
        <HStack gap="16px" align="start">
          <Icon size="lg" color="blue" flexShrink={0} mt="10px">
            <FaFacebook />
          </Icon>
          <Link
            href={facebookLink}
            target="_blank"
            _hover={{ textDecoration: "none" }}
            color="textWhite"
            minH="44px"
            overflowWrap="anywhere"
          >
            {facebook}
          </Link>
        </HStack>
      </SimpleGrid>
    </ContactBlock>
  );
}
