import { Box, Heading, Text } from "@chakra-ui/react";
import { Element } from "react-scroll";
import { email, phoneNumber } from "../constants";

export default function Contact() {
  return (
    <Element name="contact">
      <Box
        h="100vh"
        bg="white"
        color="secondary"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Kapcsolat</Heading>
        <Text>📞 {phoneNumber}</Text>
        <Text>✉️ {email}</Text>
      </Box>
    </Element>
  );
}
