import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Element } from "react-scroll";

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
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Flex flexDirection="column" justify="center" align="center">
              <Heading>Holló Villany</Heading>
              <Text>
                Megbízható villanyszerelés, gyors kiszállás és precíz munka.
              </Text>
            </Flex>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Image background="transparent" src="profile.jpg" w="10em"></Image>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Element>
  );
}
