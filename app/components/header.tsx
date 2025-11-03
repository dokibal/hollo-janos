import {
  Flex,
  Link as ChakraLink,
  Box,
  Drawer,
  CloseButton,
  Button,
  Portal,
  IconButton,
  HStack,
  VStack,
  Heading,
  Image,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { companyName, phoneNumberLink } from "../constants";
import { useState } from "react";
import { Button as CustomButton } from "./button";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import { MdElectricalServices } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { JSX } from "@emotion/react/jsx-runtime";

type NavItem = {
  to: string;
  title: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  {
    to: "/#about",
    title: "Rólunk",
    icon: (
      <Icon size="md" color="white">
        <FaInfoCircle />
      </Icon>
    ),
  },
  {
    to: "/#services",
    title: "Szolgáltatások",
    icon: (
      <Icon size="lg" color="white">
        <MdElectricalServices />
      </Icon>
    ),
  },
  {
    to: "/#contact",
    title: "Kapcsolat",
    icon: (
      <Icon size="md" color="red">
        <FaPhoneAlt />
      </Icon>
    ),
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Box
      bg="white"
      color="white"
      p="0.5em"
      height="3em"
      width="100%"
      boxShadow="sm"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <Flex alignItems="center" height="100%" w="100%">
        <HStack
          height="100%"
          marginLeft="0.5em"
          spaceX="0.5em"
          cursor="pointer"
        >
          <Image src="company_logo.png" height="100%" width="auto" />
          <Heading color="primary">{companyName}</Heading>
        </HStack>

        <Flex display={{ base: "none", md: "flex" }} gap={4} ml="auto">
          {navItems.map((item) => (
            <Link href={item.to}>
              <Button
                background="white"
                color="secondary"
                borderBottom="hidden 1px"
                _active={{ color: "accent" }}
                _hover={{
                  color: "accent",
                  textDecoration: "none",
                  borderBottomColor: "accent",
                  borderRadius: "0",
                  borderBottom: "solid 1px",
                }}
              >
                {item.title}
              </Button>
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
              _hover={{ bg: "accent", color: "primary" }}
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
                        {item.icon}
                        <ChakraLink
                          cursor="pointer"
                          color="white"
                          _hover={{ color: "accent" }}
                          textDecoration="none"
                          fontSize="xl"
                          href={item.to}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </ChakraLink>
                      </HStack>
                    ))}
                    <Flex w="full" justify="center">
                      <ChakraLink
                        href="#services"
                        onClick={() => setMenuOpen(false)}
                        _hover={{ textDecoration: "none" }}
                      >
                        <CustomButton>Kérjen árajánlatot tőlünk</CustomButton>
                      </ChakraLink>
                    </Flex>
                    <Flex w="full" justify="center">
                      <ChakraLink
                        href={phoneNumberLink}
                        _hover={{ textDecoration: "none" }}
                      >
                        <CustomButton>Hívjon most</CustomButton>
                      </ChakraLink>
                    </Flex>
                  </VStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    color="white"
                    _hover={{ background: "accent" }}
                  />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
}
