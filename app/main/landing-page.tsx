import { Box, Link as ChakraLink, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "../components/button";

export default function LandingPage() {
  return (
    <section id="">
      <Box
        minHeight={{ base: "100dvh", md: "100vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        backgroundColor="white"
        backgroundImage="url('landing-background.webp')"
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex={1}
      >
        <Box
          position="absolute"
          inset="0"
          backdropFilter="blur(5px)"
          bg="rgba(0,0,0,0.6)"
          zIndex={0}
        />

        <Box
          position="relative"
          zIndex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            as="h1"
            color="textWhite"
            textShadow="black"
            size={{ base: "4xl", md: "5xl" }}
            textAlign="center"
          >
            Profi villanyszerelés Tatabányán és környékén
          </Heading>
          <Heading
            color="accent"
            textShadow="black"
            size={{ base: "2xl", md: "3xl" }}
            marginTop="1em"
            marginBottom="2em"
            textAlign="center"
          >
            Ingyenes kiszállás, versenyképes árak és szakszerű kivitelezés
          </Heading>
          <Box>
            <Button asChild>
              <ChakraLink
                as={Link}
                href="#contact"
                textDecoration="none"
                outline="none"
              >
                Vegye fel velünk a kapcsolatot még ma!
              </ChakraLink>
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
