import { Flex, HStack, Icon, Link } from "@chakra-ui/react";
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
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="left"
        gap="1em"
        marginLeft={{ base: "1em", md: "2em" }}
        fontSize={{ base: "lg", md: "2xl" }}
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
      </Flex>
    </ContactBlock>
  );
}
