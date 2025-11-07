import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import Form from "./form";
import ContactUs from "./contact-us";
import Locations from "./locations";

export default function Contact() {
  return (
    <section id="contact">
      <Flex
        minH={{ base: "auto", md: "100vh" }}
        p="2em"
        overflow="auto"
        display="flex"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="2em" width="100%">
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2em"
          >
            <ContactUs />
            <Locations />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, md: 2 }}
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
