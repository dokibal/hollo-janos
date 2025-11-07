import { Box, Heading, Text } from "@chakra-ui/react";
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

export default function Locations() {
  return (
    <ContactBlock
      title="Jelenleg a következő településeken vállalunk munkákat"
      color="primary"
    >
      <Box spaceY="1em" color="textWhite">
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
    </ContactBlock>
  );
}
