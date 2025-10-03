import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link, Element } from "react-scroll";

export default function About() {
  return (
    <Element name="">
      <Box
        h="100vh"
        bg="white"
        color="secondary"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading>Holló Villany</Heading>
        <Text>
          Megbízható villanyszerelés, gyors kiszállás és precíz munka.
        </Text>
      </Box>
    </Element>
  );
}
