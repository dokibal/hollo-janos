import { Box } from "@chakra-ui/react";
import Reveal from "../components/reveal";
import ContactUs from "./contact-us";
import Locations from "./locations";
import Form from "./quotation";

export default function Contact() {
  return (
    <section id="contact" className="section-space">
      <Box className="site-container contact-grid">
        <Reveal className="contact-details">
          <ContactUs />
        </Reveal>
        <Reveal className="contact-form">
          <Form />
        </Reveal>
        <Reveal className="contact-locations">
          <Locations />
        </Reveal>
      </Box>
    </section>
  );
}
