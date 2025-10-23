import { Box } from "@chakra-ui/react";
import { JSX } from "react";

type PageLayoutProps = {
  bg: string;
  children: JSX.Element | JSX.Element[];
};
export const Background = ({ bg, children }: Readonly<PageLayoutProps>) => (
  <Box position="relative" minH="100vh" overflow="hidden">
    <Box
      position="absolute"
      inset="0"
      bgImage="url('/background.svg')"
      bgRepeat="repeat"
      bgSize="200px"
      bgColor={bg}
      bgBlendMode="multiply"
      opacity={0.3}
      zIndex={0}
    />

    <Box position="relative" zIndex={1}>
      {children}
    </Box>
  </Box>
);
