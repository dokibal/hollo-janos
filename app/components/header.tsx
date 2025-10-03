import { Link } from "react-scroll";
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
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { phoneNumberLink } from "../constants";

type NavItem = {
  to: string;
  title: string;
  icon: string;
};

const navItems: NavItem[] = [
  { to: "", title: "Rólunk", icon: "ℹ️" },
  { to: "services", title: "Szolgáltatások", icon: "🔧" },
  { to: "contact", title: "Kapcsolat", icon: "📞" },
];

export default function Header() {
  return (
    <Box
      bg="white"
      color="white"
      p={4}
      position="fixed"
      top="0"
      right="0"
      left="0"
      zIndex="1000"
    >
      <Flex alignItems="center">
        <Link to="" smooth={true} duration={500}>
          <Box fontWeight="bold" cursor="pointer">
            ⚡
          </Box>
        </Link>

        <HStack
          justify="center"
          gap={6}
          ml="auto"
          display={{ base: "none", md: "flex" }}
        >
          {navItems.map((item) => (
            <Link to={item.to} smooth={true} duration={500}>
              <ChakraLink
                background="white"
                color="secondary"
                _hover={{ color: "primary" }}
              >
                {item.title}
              </ChakraLink>
            </Link>
          ))}
        </HStack>

        <Drawer.Root>
          <Drawer.Trigger asChild>
            <IconButton
              size="md"
              aria-label="Open Menu"
              display={{ base: "flex", md: "none" }}
              bg="background"
              _hover={{ bg: "accent" }}
              ml="auto"
            >
              <HamburgerIcon />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Positioner>
              <Drawer.Content bg="primary">
                <Drawer.Body mt="5em">
                  <VStack gap={6} align="start">
                    {navItems.map((item) => (
                      <HStack>
                        <Box as="span">{item.icon}</Box>
                        <Link to={item.to} smooth={true} duration={500}>
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
                        <Button bg="accent" color="white" size="lg">
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
