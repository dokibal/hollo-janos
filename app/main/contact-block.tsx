import { Box, Heading, VStack } from "@chakra-ui/react";
import { JSX } from "react";

type ContactBlockProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
  color: "textWhite" | "primary";
};

export default function ContactBlock({
  children,
  color,
  title,
}: Readonly<ContactBlockProps>) {
  return (
    <VStack
      display="flex"
      justifyContent="left"
      bgColor={color}
      color={color === "textWhite" ? "black" : "textWhite"}
      borderRadius="1em"
      width="100%"
      height="100%"
      paddingTop="5em"
      paddingBottom="5em"
      boxShadow="0 4px 20px 0 rgba(15, 17, 19, 0.7), 0 4px 20px 0 rgba(15, 17, 19, 0.7)"
      fontSize={{ base: "md", md: "lg" }}
      padding="2em 1em 2em 1em"
    >
      <Box display="flex" justifyContent="left" width="100%">
        <Heading marginBottom="2em" size="xl">
          {title}
        </Heading>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="left"
        gap="1em"
        width="100%"
        height="100%"
      >
        {children}
      </Box>
    </VStack>
  );
}
