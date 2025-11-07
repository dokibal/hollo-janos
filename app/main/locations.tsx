import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import ContactBlock from "./contact-block";
import { locations } from "../locations";

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
          {locations.keys().map((k) => (
            <Box>
              <Heading color="accent" size="xl" marginBottom="0.5em">
                {k}:{" "}
              </Heading>
              <Text display="inline">
                {locations.get(k)?.map((l, index) => (
                  <>
                    <Text
                      display="inline"
                      color={
                        importantLocations.includes(l) ? "accent" : "inherit"
                      }
                    >
                      {l}
                    </Text>
                    <Text display="inline">
                      {index < Number(locations.get(k)?.length) - 1 ? ", " : ""}
                    </Text>
                  </>
                ))}
              </Text>
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
