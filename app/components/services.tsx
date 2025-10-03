import { Box, Heading, Text } from "@chakra-ui/react";
import { Element } from "react-scroll";

export default function Services() {
  return (
    <Element name="services">
      <Box
        h="100vh"
        bg="#F8F9FA"
        color="secondary"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Szolgáltatások</Heading>
        <Text>
          Lakossági és ipari villanyszerelés - Hibaelhárítás - Teljes hálózat
          kiépítés
        </Text>
      </Box>
    </Element>
  );
}
