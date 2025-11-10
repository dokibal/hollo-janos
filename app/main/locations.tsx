import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { locations } from "../locations";
import ContactBlock from "./contact-block";

const importantLocations: string[] = [
  "Tatabánya",
  "Oroszlány",
  "Bicske",
  "Komárom",
  "Mór",
  "Tata",
  "Kisbér",
];

const placeId: string =
  "ChIJhw6XrnlAakcRgBIeDCnEAAQ&key=AIzaSyByhqgtXi4_iekCPb0IjtKoJWW96FQ3gi8";
const apiKey: string = "AIzaSyATFkbwV2XUjMld5fGWn_yP0iw0m-O6bDc";
const zoom: number = 10;

export default function Locations() {
  return (
    <ContactBlock
      title="Jelenleg a következő településeken vállalunk munkákat"
      color="primary"
    >
      <Flex flexDirection="column">
        <Box spaceY="1em" color="textWhite" marginBottom="2em">
          {Array.from(locations.keys()).map((k) => (
            <Box key={k}>
              <Heading
                color="accent"
                fontSize={{ base: "lg", md: "xl" }}
                marginBottom="0.5em"
              >
                {k}:{" "}
              </Heading>
              <Box display="inline">
                {locations.get(k)?.map((l: string, index: number) => (
                  <div key={l} style={{ display: "inline" }}>
                    <Text
                      display="inline"
                      color={
                        importantLocations.includes(l) ? "accent" : "inherit"
                      }
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      {l}
                    </Text>
                    <Text display="inline" fontSize={{ base: "md", md: "lg" }}>
                      {index < Number(locations.get(k)?.length) - 1 ? ", " : ""}
                    </Text>
                  </div>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Flex
          aspectRatio="1"
          marginLeft={{ base: 0, md: "20%" }}
          marginRight={{ base: 0, md: "20%" }}
          justifyContent="center"
        >
          <iframe
            title="Térkép Tatabányával középen nagyjából 30 kilométeres sugárral"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1em",
            }}
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}&zoom=${zoom}`}
          ></iframe>
        </Flex>
      </Flex>
    </ContactBlock>
  );
}
