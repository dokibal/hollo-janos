import {
  Box,
  Flex,
  GridItem,
  Heading,
  List,
  SimpleGrid,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Button } from "../components/button";
import Link from "next/link";

const advantages: string[] = [
  "⚡ Gyors, pontos és szakszerű munkavégzés",
  "🧰 Megbízható, minőségi anyagok és korszerű technológiák",
  "📅 Rugalmas időpont-egyeztetés, gyors kiszállás",
  "💬 Korrekt árak, rejtett költségek nélkül",
  "✅ Garancia minden elvégzett munkára",
];

export default function About() {
  return (
    <section id="about">
      <Flex
        minH={{ base: "auto", md: "100vh" }}
        padding="clamp(1rem, 4vw, 3rem)"
      >
        <SimpleGrid columns={{ base: 1, md: 10 }} gap="3em">
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            colSpan={{ base: 1, md: 6 }}
          >
            <VStack
              display="flex"
              justifyContent="left"
              bgColor="primary"
              color="textWhite"
              borderRadius="1em"
              width="100%"
              paddingTop="5em"
              paddingBottom="5em"
              boxShadow="0 4px 20px 0 rgba(15, 17, 19, 0.7), 0 4px 20px 0 rgba(15, 17, 19, 0.7)"
              fontSize={{ base: "lg", md: "xl" }}
              padding="2em 1em 2em 1em"
            >
              <Box
                display="flex"
                justifyContent="left"
                width="100%"
                marginBottom="0.5em"
              >
                <Heading size="lg">Miért válasszon minket?</Heading>
              </Box>
              <Text textStyle="md" fontWeight="normal" marginLeft="1em">
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
                marginTop="0.5em"
                marginBottom="0.5em"
              >
                <Heading size="lg">Amit kínálunk: </Heading>
              </Box>
              <Box
                display="flex"
                justifyContent="left"
                width="100%"
                marginLeft="1em"
              >
                <List.Root
                  listStyle="none"
                  marginBottom="0.5em"
                  textStyle="md"
                  fontWeight="normal"
                >
                  {advantages.map((a) => (
                    <List.Item
                      key={a}
                      padding="0.25em"
                      _hover={{
                        background: "accent",
                        color: "textWhite",
                        borderRadius: "1em",
                      }}
                    >
                      {a}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              <Text textStyle="md" fontWeight="normal" marginBottom="1em">
                Célunk, hogy ne csak egy szolgáltatást, hanem biztonságot és
                nyugalmat nyújtsunk Önnek. <br />
                Válasszon minket, ha fontos Önnek a precizitás, a biztonság és a
                megbízhatóság - mert mi nem csak dolgozunk, hanem felelősséget
                is vállalunk munkánkért.
              </Text>
              <Link href="#services">
                <Button>Fedezze fel szolgáltatásainkat</Button>
              </Link>
            </VStack>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            colSpan={{ base: 1, md: 4 }}
          >
            <VStack>
              <Image
                src="profile.webp"
                borderRadius="1em"
                width="60%"
                boxShadow="0 4px 20px 0 rgba(15, 17, 19, 0.7), 0 4px 20px 0 rgba(15, 17, 19, 0.7)"
                objectFit="cover"
              />
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </section>
  );
}
