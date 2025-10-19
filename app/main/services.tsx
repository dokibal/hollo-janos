import {
  Box,
  Card,
  GridItem,
  Heading,
  HStack,
  List,
  SimpleGrid,
} from "@chakra-ui/react";

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
  title: string;
  content: string[];
};

export const ServiceCard = ({ title, content }: Readonly<ServiceCardProps>) => {
  return (
    <Card.Root
      bg="primary"
      borderColor="primary"
      height="100%"
      borderRadius="2em"
      color="white"
    >
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <List.Root>
          {content.map((c) => (
            <List.Item>{c}</List.Item>
          ))}
        </List.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default function Services() {
  return (
    <section id="services">
      <Box minH="100vh" bg="#F8F9FA" p="2em">
        <Heading marginBottom="2em">Szolgáltatások</Heading>
        <SimpleGrid gap="2em" columns={{ base: 1, md: 2 }}>
          <GridItem>
            <ServiceCard
              title="Lakossági/céges villanyszerelés"
              content={personal}
            />
          </GridItem>
          <GridItem>
            <ServiceCard
              title="További kisipari/céges villanyszerelés"
              content={business}
            />
          </GridItem>
        </SimpleGrid>
      </Box>
    </section>
  );
}
