import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as ChakraLink,
  Drawer,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
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

            if (window.location.hash !== `#${id}`) {
              history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      bg="white"
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
          <ChakraLink as={Link} href="/" textDecoration="none" outline="none">
            <Image
              src="company_logo.webp"
              height="2em"
              width="auto"
              objectFit="contain"
              alt="Fekete holló sárga vezetéken"
            />
            <Heading color="primary">{companyName}</Heading>
          </ChakraLink>
        </HStack>

        <Flex display={{ base: "none", md: "flex" }} gap={4} ml="auto">
          {navItems.map((item) => (
            <Link key={item.to} href={item.to}>
              <Button
                fontSize="lg"
                background="none"
                color={
                  item.to.substring(2) === activeSection
                    ? "accent"
                    : "secondary"
                }
                borderBottom="hidden 1px"
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
          preventScroll={true}
        >
          <Drawer.Backdrop />
          <Drawer.Trigger asChild>
            <IconButton
              size="md"
              aria-label="Open Menu"
              display={{ base: "flex", md: "none" }}
              bg="primary"
              color="textWhite"
              _hover={{ bg: "accent", color: "primary" }}
              ml="auto"
            >
              <HamburgerIcon />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Positioner>
              <Drawer.Content bg="primary">
                <Drawer.Body mt="5em">
                  <VStack gap="2em" align="center">
                    {navItems.map((item) => (
                      <HStack color="textWhite">
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
                      <ChakraLink
                        as={Link}
                        href="/#quotation"
                        onClick={() => setMenuOpen(false)}
                        textDecoration="none"
                        outline="none"
                      >
                        <CustomButton>Kérjen árajánlatot</CustomButton>
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href={phoneNumberLink}
                        textDecoration="none"
                        outline="none"
                      >
                        <CustomButton>Hívjon most</CustomButton>
                      </ChakraLink>
                    </Flex>
                  </VStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <Icon
                    size="2xl"
                    color="textWhite"
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <IoClose />
                  </Icon>
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
}
