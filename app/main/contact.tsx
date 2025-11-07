import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import Form from "./form";
import ContactUs from "./contact-us";
import Locations from "./locations";

export default function Contact() {
  return (
    <section id="contact">
      <Flex
        minH={{ base: "auto", md: "100vh" }}
        padding="clamp(1rem, 4vw, 3rem)"
        overflow="auto"
        display="flex"
      >
        <SimpleGrid columns={{ base: 1, md: 5 }} gap="4em" width="100%">
          <GridItem
            colSpan={{ base: 1, md: 2 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="4em"
          >
            <ContactUs />
            <Locations />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, md: 3 }}
            display="flex"
            alignItems="center"
          >
            <Form />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </section>
  );
}
