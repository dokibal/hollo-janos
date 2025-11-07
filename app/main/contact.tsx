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
        height="100%"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4em">
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            display="flex"
            flexDirection="column"
            gap="4em"
          >
            <ContactUs />
            <Locations />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }} display="flex">
            <Form />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </section>
  );
}
