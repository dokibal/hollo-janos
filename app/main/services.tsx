import {
  Box,
  Card,
  GridItem,
  Heading,
  Icon,
  List,
  Text,
  SimpleGrid,
  HStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { MdBolt } from "react-icons/md";
import { MdElectricalServices } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";

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
      bg="white"
      height="100%"
      borderRadius="1em"
      bgColor="rgba(255, 255, 255, 0.9)"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.2)"
    >
      <Card.Header fontSize="lg" fontWeight="semibold">
        <HStack>
          {icon}
          {title}
        </HStack>
      </Card.Header>
      <Card.Body>
        <List.Root variant="plain">
          {content.map((c) => (
            <List.Item display="flex" alignItems="center" gap="0.5em">
              <List.Indicator>
                <Icon size="lg" color="accent">
                  <MdBolt />
                </Icon>
              </List.Indicator>
              <Text
                padding="0.25em"
                width="100%"
                color="primary"
                _hover={{
                  background: "accent",
                  color: "textWhite",
                  borderRadius: "1em",
                }}
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
        p="2em"
        scrollMarginTop="2em"
      >
        <Heading marginBottom="2em" color="white">
          Szolgáltatások
        </Heading>
        <SimpleGrid gap="2em" columns={{ base: 1, md: 2 }}>
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
            marginTop="3em"
            width={{ base: "100%", md: "50%" }}
            borderRadius="1em"
          />
        </Flex>
      </Box>
    </section>
  );
}
