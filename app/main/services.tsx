import {
  Box,
  Card,
  GridItem,
  Heading,
  HStack,
  Icon,
  List,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import Image from "next/image";
import { FaLightbulb } from "react-icons/fa";
import { MdBolt, MdElectricalServices } from "react-icons/md";
import toolsImage from "../../public/tools.webp";
import Reveal from "../components/reveal";

const personal: string[] = [
  "Új elektromos hálózat kiépítése családi házakban, lakásokban",
  "Régi hálózat felújítása, vezetékcsere",
  "Dugaljak, kapcsolók, lámpák felszerelés/cseréje",
  "FI-relé (életvédelmi relé) beépítése",
  "Elektromos fűtés kiépítése",
  "Bojler bekötése",
  "Hibakeresés, rövidzárlat javítás",
  "Villanytűzhely bekötése",
  "Elosztó tábla cseréje",
  "Túlfeszültség elleni védelem kiépítése",
  "Kültéri villanyszerelés: kerti lámpák, dugaljak telepítése",
  "Világítási rendszer korszerűsítése, LED-es fényforrások telepítése",
];

const business: string[] = [
  "Új üzlethelyiségek, irodák, raktárak elektromos hálózatának kiépítése",
  "Régi rendszerek felújítása, bővítése",
  "Gépek, berendezések, bekötése",
  "Erős- és gyengeáramú hálózatok kivitelezése",
  "LED és energiatakarékos világítási rendszerek tervezése és telepítése",
  "Rendszeres karbantartás, hibajavítás",
];

type ServiceCardProps = {
  icon: JSX.Element;
  title: string;
  content: string[];
};

export const ServiceCard = ({
  icon,
  title,
  content,
}: Readonly<ServiceCardProps>) => {
  return (
    <Card.Root
      borderRadius="1em"
      bgColor="white"
      color="primary"
      boxShadow="0 8px 24px rgba(0,0,0,0.12)"
      border="none"
      minW="0"
    >
      <Card.Header padding={{ base: "24px 24px 0", md: "32px 32px 0" }}>
        <HStack gap="12px" align="start">
          {icon}
          <Heading as="h3" fontSize={{ base: "20px", md: "24px" }} lineHeight="1.3">
            {title}
          </Heading>
        </HStack>
      </Card.Header>
      <Card.Body padding={{ base: "24px", md: "28px 32px 32px" }}>
        <List.Root variant="plain" gap="12px">
          {content.map((c) => (
            <List.Item key={c} display="flex" alignItems="start" gap="12px">
              <List.Indicator flexShrink={0} mt="3px">
                <Icon size="lg" color="accent">
                  <MdBolt />
                </Icon>
              </List.Indicator>
              <Text
                width="100%"
                lineHeight="1.6"
                fontSize={{ base: "md", md: "lg" }}
              >
                {c}
              </Text>
            </List.Item>
          ))}
        </List.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default function Services() {
  return (
    <section id="services" className="section-space">
      <Box className="site-container">
        <Heading
          as="h2"
          fontSize={{ base: "28px", md: "32px" }}
          lineHeight="1.25"
          letterSpacing="-0.02em"
          marginBottom={{ base: "28px", md: "36px" }}
          color="white"
        >
          Teljeskörű villanyszerelési megoldások
        </Heading>
        <SimpleGrid gap="32px" columns={{ base: 1, lg: 2 }} alignItems="start">
          <GridItem>
            <Reveal>
              <ServiceCard
                icon={
                  <Icon color="primary" size="2xl">
                    <FaLightbulb />
                  </Icon>
                }
                title="Lakossági/céges villanyszerelés"
                content={personal}
              />
            </Reveal>
          </GridItem>
          <GridItem>
            <Reveal>
              <ServiceCard
                icon={
                  <Icon color="primary" size="2xl">
                    <MdElectricalServices />
                  </Icon>
                }
                title="További kisipari/céges villanyszerelés"
                content={business}
              />
            </Reveal>
            <Box mt="32px" width="100%" maxW="480px" mx="auto">
              <Reveal>
                <Image
                  src={toolsImage}
                  sizes="(min-width: 64rem) 40vw, (min-width: 36rem) 480px, calc(100vw - 48px)"
                  style={{ width: "100%", height: "auto", borderRadius: "1em" }}
                  alt="Villanyszerelő szerszámok, izzók, szigetelő szalagok"
                />
              </Reveal>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </section>
  );
}
