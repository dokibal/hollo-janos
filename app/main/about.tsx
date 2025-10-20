import {
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  List,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function About() {
  return (
    <section id="about">
      <Box
        minH={{ base: "auto", md: "100vh" }}
        p="2em"
        bg="white"
        color="secondary"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Flex flexDirection="column" padding="2em">
              <Heading>Miért válasszon minket?</Heading>
              <Text>
                Ha megbízható, precíz és tapasztalt villanyszerelőt keres, jó
                helyen jár! Cégünk több éves szakmai tapasztalattal vállal
                teljes körű villanyszerelési munkákat lakossági és céges
                ügyfelek számára. Fontos számunkra, hogy minden ügyfelünk
                biztonságban és elégedetten használhassa elektromos hálózatát —
                legyen szó egy kisebb javításról vagy teljes új rendszer
                kiépítéséről.
              </Text>
              <Text>Amit kínálunk:</Text>
              <List.Root listStyle="none">
                <List.Item>⚡ Gyors, pontos és szakszerű munkavégzés</List.Item>
                <List.Item>
                  🧰 Megbízható, minőségi anyagok és korszerű technológiák
                </List.Item>
                <List.Item>
                  📅 Rugalmas időpont-egyeztetés, gyors kiszállás
                </List.Item>
                <List.Item>💬 Korrekt árak, rejtett költségek nélkül</List.Item>
                <List.Item>✅ Garancia minden elvégzett munkára</List.Item>
              </List.Root>
              <Text>
                Célunk, hogy ne csak egy szolgáltatást, hanem biztonságot és
                nyugalmat nyújtsunk Önnek. Válasszon minket, ha fontos Önnek a
                precizitás, a biztonság és a megbízhatóság – mert mi nem csak
                dolgozunk, hanem felelősséget is vállalunk munkánkért.
              </Text>
            </Flex>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Image background="transparent" src="profile.jpg" w="10em"></Image>
          </GridItem>
        </SimpleGrid>
      </Box>
    </section>
  );
}
