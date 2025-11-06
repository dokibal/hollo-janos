import { Box, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { Button } from "../components/button";
import Link from "next/link";

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
        backgroundImage="url('landing-background.png')"
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
            color="textWhite"
            textShadow="black"
            size={{ base: "4xl", md: "5xl" }}
            textAlign="center"
          >
            Profi villanyszerelés gyorsan és megbízhatóan
          </Heading>
          <Heading
            color="accent"
            textShadow="black"
            size={{ base: "2xl", md: "3xl" }}
            marginTop="1em"
            marginBottom="2em"
            textAlign="center"
          >
            Tatabányán és környékén ingyenes kiszállással
          </Heading>
          <Box>
            <Button asChild>
              <ChakraLink
                as={Link}
                href="#contact"
                textDecoration="none"
                outline="none"
              >
                Vegye fel velünk a kapcsolatot
              </ChakraLink>
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
