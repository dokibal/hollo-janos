import {
  Box,
  Link as ChakraLink,
  Drawer,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import Link from "next/link";
import Image from "next/image";
import companyLogo from "../../public/company_logo.webp";
import { useEffect, useState } from "react";
import { FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdElectricalServices } from "react-icons/md";
import { companyName, phoneNumberLink } from "../constants";
import { Button as CustomButton } from "./button";

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
      <Icon size="md">
        <FaInfoCircle />
      </Icon>
    ),
  },
  {
    to: "/#services",
    title: "Szolgáltatásaink",
    icon: (
      <Icon size="lg">
        <MdElectricalServices />
      </Icon>
    ),
  },
  {
    to: "/#contact",
    title: "Kapcsolat",
    icon: (
      <Icon size="md">
        <FaPhoneAlt />
      </Icon>
    ),
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section:not(#quotation)");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id: string = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      { threshold: 0, rootMargin: "-80px 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      bg="white"
      height="64px"
      width="100%"
      borderBottom="1px solid #E4E5E2"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <Flex className="site-container" alignItems="center" height="100%">
        <HStack
          height="100%"
          spaceX="0.5em"
          cursor="pointer"
        >
          <ChakraLink as={Link} href="/" gap="10px" textDecoration="none" outline="none">
            <Image
              src={companyLogo}
              width={35}
              height={32}
              loading="eager"
              style={{ height: "2em", width: "auto", objectFit: "contain" }}
              alt="Fekete holló sárga vezetéken"
            />
            <Heading as="span" color="primary">
              {companyName}
            </Heading>
          </ChakraLink>
        </HStack>

        <Flex as="nav" display={{ base: "none", md: "flex" }} gap="24px" ml="auto" height="100%" alignItems="center">
          {navItems.map((item) => (
              <ChakraLink
                as={Link}
                key={item.to}
                href={item.to}
                aria-current={item.to.substring(2) === activeSection ? "location" : undefined}
                fontSize="md"
                minH="44px"
                fontWeight="bold"
                color={item.to.substring(2) === activeSection ? "primary" : "secondary"}
                borderBottom="3px solid"
                borderBottomColor={item.to.substring(2) === activeSection ? "accent" : "transparent"}
                borderRadius="0"
                textDecoration="none"
                transition="border-color 160ms ease, color 160ms ease"
                _hover={{
                  color: "primary",
                  textDecoration: "none",
                  borderBottomColor: "accent",
                }}
              >
                {item.title}
              </ChakraLink>
          ))}
        </Flex>

        <Drawer.Root
          open={menuOpen}
          onOpenChange={(e) => setMenuOpen(e.open)}
          placement="end"
          preventScroll={true}
        >
          <Drawer.Backdrop />
          <Drawer.Trigger asChild>
            <IconButton
              size="md"
              minW="44px"
              minH="44px"
              aria-label="Open Menu"
              display={{ base: "flex", md: "none" }}
              bg="primary"
              color="textWhite"
              _hover={{ bg: "accent", color: "primary" }}
              ml="auto"
            >
              <Icon>
                <FiMenu />
              </Icon>
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Positioner>
              <Drawer.Content bg="primary">
                <Drawer.Body mt="5em">
                  <VStack gap="2em" align="center">
                    {navItems.map((item) => (
                      <HStack key={item.to} color="textWhite">
                        {item.icon}
                        <ChakraLink
                          as={Link}
                          cursor="pointer"
                          _hover={{ color: "accent" }}
                          color="textWhite"
                          textDecoration="none"
                          outline="none"
                          fontSize="xl"
                          href={item.to}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </ChakraLink>
                      </HStack>
                    ))}
                    <Flex
                      flexDirection="column"
                      w="full"
                      alignItems="center"
                      gap="2em"
                    >
                      <CustomButton asChild>
                        <Link href="/#quotation" onClick={() => setMenuOpen(false)}>Kérjen árajánlatot</Link>
                      </CustomButton>
                      <CustomButton asChild>
                        <Link href={phoneNumberLink}>Hívjon most</Link>
                      </CustomButton>
                    </Flex>
                  </VStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    aria-label="Close Menu"
                    position="absolute"
                    top="16px"
                    right="16px"
                    minW="44px"
                    minH="44px"
                    bg="transparent"
                    color="textWhite"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    <IoClose />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
}
