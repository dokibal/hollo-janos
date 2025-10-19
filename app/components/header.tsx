import {
  Flex,
  Link as ChakraLink,
  Box,
  Drawer,
  CloseButton,
  Portal,
  IconButton,
  HStack,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { companyName, phoneNumberLink } from "../constants";
import { useState } from "react";
import { Button } from "./button";
import Link from "next/link";

type NavItem = {
  to: string;
  title: string;
  icon: string;
};

const navItems: NavItem[] = [
  { to: "/#about", title: "Rólunk", icon: "ℹ️" },
  { to: "/#services", title: "Szolgáltatások", icon: "🔧" },
  { to: "/#contact", title: "Kapcsolat", icon: "📞" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Box
      bg="white"
      color="white"
      p="0.5em"
      width="100%"
      boxShadow="sm"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <Flex alignItems="center" w="100%">
        <Link href="">
          <HStack>
            <Box fontWeight="bold" cursor="pointer">
              ⚡
            </Box>
            <Heading color="primary">{companyName}</Heading>
          </HStack>
        </Link>

        <Flex display={{ base: "none", md: "flex" }} gap={4} ml="auto">
          {navItems.map((item) => (
            <Link href={item.to}>
              <ChakraLink
                background="white"
                color="secondary"
                _hover={{ color: "primary" }}
              >
                {item.title}
              </ChakraLink>
            </Link>
          ))}
        </Flex>

        <Drawer.Root
          open={menuOpen}
          onOpenChange={(e) => setMenuOpen(e.open)}
          placement="end"
        >
          <Drawer.Trigger asChild>
            <IconButton
              size="md"
              aria-label="Open Menu"
              display={{ base: "flex", md: "none" }}
              bg="primary"
              color="white"
              _hover={{ bg: "accent" }}
              ml="auto"
            >
              <HamburgerIcon />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Positioner pl="0.5em" pr="0.5em">
              <Drawer.Content bg="primary">
                <Drawer.Body mt="2em">
                  <VStack gap={6} align="center">
                    {navItems.map((item) => (
                      <HStack>
                        <Box as="span">{item.icon}</Box>
                        <Link href={item.to} onClick={() => setMenuOpen(false)}>
                          <ChakraLink cursor="pointer" color="white">
                            {item.title}
                          </ChakraLink>
                        </Link>
                      </HStack>
                    ))}
                    <Flex w="full" justify="center">
                      <ChakraLink
                        href={phoneNumberLink}
                        _hover={{ textDecoration: "none" }}
                      >
                        <Button bg="accent" color="white">
                          Hívjon most
                        </Button>
                      </ChakraLink>
                    </Flex>
                  </VStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
}
