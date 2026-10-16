import {
  Box,
  Flex,
  GridItem,
  Heading,
  Icon,
  List,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaBolt, FaCalendarAlt, FaComments, FaShieldAlt, FaTools } from "react-icons/fa";
import profileImage from "../../public/profile.webp";
import { Button } from "../components/button";
import Reveal from "../components/reveal";

const advantages = [
  { icon: FaBolt, text: "Gyors, pontos és szakszerű munkavégzés" },
  { icon: FaTools, text: "Megbízható, minőségi anyagok és korszerű technológiák" },
  { icon: FaCalendarAlt, text: "Rugalmas időpont-egyeztetés, gyors kiszállás" },
  { icon: FaComments, text: "Korrekt árak, rejtett költségek nélkül" },
  { icon: FaShieldAlt, text: "Garancia minden elvégzett munkára" },
];

export default function About() {
  return (
    <section id="about" className="section-space">
      <Flex className="site-container">
        <SimpleGrid
          columns={{ base: 1, lg: 10 }}
          gap={{ base: "32px", lg: "48px" }}
          width="100%"
          alignItems="center"
        >
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            colSpan={{ base: 1, lg: 6 }}
            minW="0"
          >
            <Reveal>
              <VStack
                align="stretch"
                gap="20px"
                bgColor="primary"
                color="textWhite"
                borderRadius="16px"
                width="100%"
                boxShadow="0 8px 24px rgba(0,0,0,0.12)"
                padding={{ base: "24px", md: "36px" }}
              >
                <Box
                  display="flex"
                  justifyContent="left"
                  width="100%"
                >
                  <Heading
                    as="h2"
                    fontSize={{ base: "28px", md: "32px" }}
                    lineHeight="1.25"
                    letterSpacing="-0.02em"
                  >
                    Miért válasszon minket?
                  </Heading>
                </Box>
                <Text
                  as="p"
                  textStyle="md"
                  fontWeight="normal"
                  lineHeight="1.7"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Ha tapasztalt, precíz és megbízható villanyszerelőt keres
                  Tatabányán vagy a környező településeken, jó helyen jár! <br />
                  <br />
                  Cégünk több éves szakmai tapasztalattal vállal teljes körű
                  villanyszerelési munkákat lakossági és céges ügyfelek számára.
                  <br />
                  Fontos számunkra, hogy minden ügyfelünk biztonságban és
                  elégedetten használhassa elektromos hálózatát — legyen szó egy
                  kisebb javításról vagy teljes új rendszer kiépítéséről.
                </Text>
                <Box
                  display="flex"
                  justifyContent="left"
                  width="100%"
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "20px", md: "24px" }}
                    lineHeight="1.3"
                  >
                    Amit kínálunk:{" "}
                  </Heading>
                </Box>
                <Box
                  display="flex"
                  justifyContent="left"
                  width="100%"
                >
                  <List.Root
                    listStyle="none"
                    gap="10px"
                    textStyle="md"
                    fontWeight="normal"
                  >
                    {advantages.map(({ icon: AdvantageIcon, text }) => (
                      <List.Item
                        key={text}
                        display="grid"
                        gridTemplateColumns="24px minmax(0, 1fr)"
                        gap="12px"
                        alignItems="start"
                        lineHeight="1.6"
                        fontSize={{ base: "md", md: "lg" }}
                      >
                        <Icon
                          as={AdvantageIcon}
                          color="accent"
                          boxSize="20px"
                          mt="3px"
                          justifySelf="center"
                          aria-hidden="true"
                        />
                        <Text as="span">{text}</Text>
                      </List.Item>
                    ))}
                  </List.Root>
                </Box>
                <Text
                  as="p"
                  textStyle="md"
                  fontWeight="normal"
                  lineHeight="1.7"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Célunk, hogy ne csak egy szolgáltatást, hanem biztonságot és
                  nyugalmat nyújtsunk Önnek. <br />
                  Válasszon minket, ha fontos Önnek a precizitás, a biztonság és a
                  megbízhatóság - mert mi nem csak dolgozunk, hanem felelősséget
                  is vállalunk munkánkért.
                </Text>
                <Box mt="4px">
                  <Button asChild>
                    <Link href="#services">Fedezze fel szolgáltatásainkat</Link>
                  </Button>
                </Box>
              </VStack>
            </Reveal>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            colSpan={{ base: 1, lg: 4 }}
            minW="0"
          >
            <VStack width="100%" maxW={{ base: "320px", lg: "400px" }}>
              <Reveal>
                <Image
                  src={profileImage}
                  sizes="(min-width: 64rem) 400px, 320px"
                  style={{
                    borderRadius: "1em",
                    width: "100%",
                    height: "auto",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.12)",
                    objectFit: "cover",
                  }}
                  alt="Villanyszerelő szakember munkaruhában"
                />
              </Reveal>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </section>
  );
}
