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
      align="stretch"
      gap="24px"
      bgColor={color === "textWhite" ? "white" : color}
      color={color === "textWhite" ? "black" : "textWhite"}
      borderRadius="16px"
      width="100%"
      height="fit-content"
      boxShadow="0 8px 24px rgba(0,0,0,0.12)"
      border="1px solid"
      borderColor={color === "textWhite" ? "#E4E5E2" : "transparent"}
      fontSize={{ base: "md", md: "lg" }}
      padding={{ base: "24px", md: "32px" }}
    >
      <Box display="flex" justifyContent="left" width="100%">
        <Heading
          as="h2"
          fontSize={{ base: "28px", md: "32px" }}
          lineHeight="1.25"
          letterSpacing="-0.02em"
        >
          {title}
        </Heading>
      </Box>
      <Box width="100%">{children}</Box>
    </VStack>
  );
}
