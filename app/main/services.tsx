import {
  Box,
  Card,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  List,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { FaLightbulb } from "react-icons/fa";
import { MdBolt, MdElectricalServices } from "react-icons/md";

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
      height="100%"
      borderRadius="1em"
      bgColor="white"
      color="primary"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.2)"
    >
      <Card.Header fontSize="lg" fontWeight="semibold">
        <HStack>
          {icon}
          <Heading fontSize={{ base: "lg", md: "xl" }}>{title}</Heading>
        </HStack>
      </Card.Header>
      <Card.Body>
        <List.Root variant="plain">
          {content.map((c) => (
            <List.Item key={c} display="flex" alignItems="center" gap="0.5em">
              <List.Indicator>
                <Icon size="lg" color="accent">
                  <MdBolt />
                </Icon>
              </List.Indicator>
              <Text
                padding="0.25em"
                width="100%"
                _hover={{
                  background: "accent",
                  color: "textWhite",
                  borderRadius: "1em",
                }}
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
    <section id="services">
      <Box
        bg="rgba(0, 0, 0, 0.4)"
        minH={{ base: "auto", md: "100vh" }}
        padding="clamp(1rem, 4vw, 3rem)"
      >
        <Heading
          fontSize={{ base: "xl", md: "2xl" }}
          marginBottom="2em"
          color="textWhite"
        >
          Teljeskörű villanyszerelési megoldások
        </Heading>
        <SimpleGrid gap="4em" columns={{ base: 1, md: 2 }}>
          <GridItem>
            <ServiceCard
              icon={
                <Icon color="primary" size="2xl">
                  <FaLightbulb />
                </Icon>
              }
              title="Lakossági/céges villanyszerelés"
              content={personal}
            />
          </GridItem>
          <GridItem>
            <ServiceCard
              icon={
                <Icon color="primary" size="2xl">
                  <MdElectricalServices />
                </Icon>
              }
              title="További kisipari/céges villanyszerelés"
              content={business}
            />
          </GridItem>
        </SimpleGrid>
        <Flex width="100%" justifyContent="center">
          <Image
            src="tools.webp"
            marginTop="4em"
            width={{ base: "100%", md: "40%" }}
            height="auto"
            borderRadius="1em"
            alt="Villanyszerelő szerszámok, izzók, szigetelő szalagok"
          />
        </Flex>
      </Box>
    </section>
  );
}
