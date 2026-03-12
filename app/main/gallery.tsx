"use client";

import {
  Box,
  Dialog,
  Heading,
  Icon,
  Image,
  Portal,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type GalleryImage = {
  src: string;
  alt: string;
};

const sources = [
  "/gallery/Adobe Express - file.webp",
  "/gallery/Adobe Express - file (1).webp",
  "/gallery/Adobe Express - file (2).webp",
];

const images: GalleryImage[] = Array.from({ length: 20 }, (_, i) => ({
  src: sources[i % sources.length],
  alt: `Minta fotó ${i + 1} - villanyszerelési munkák`,
}));

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const open = selected !== null;

  return (
    <section id="gallery">
      <Box
        minH={{ base: "auto", md: "100vh" }}
        padding="clamp(1rem, 4vw, 3rem)"
      >
        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          marginBottom="1.5em"
          color="primary"
        >
          Galéria
        </Heading>

        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap="1em">
          {images.map((img, idx) => (
            <Box
              key={`${img.src}-${idx}`}
              borderRadius="md"
              overflow="hidden"
              boxShadow="sm"
              bg="gray.50"
              cursor="pointer"
              _hover={{ boxShadow: "md" }}
              onClick={() => setSelected(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width="100%"
                height={{ base: "140px", md: "180px", lg: "200px" }}
                objectFit="cover"
                loading="lazy"
                cursor="pointer"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Dialog.Root
        open={open}
        onOpenChange={(e) => {
          if (!e.open) setSelected(null);
        }}
        placement="center"
        size="xl"
      >
        <Dialog.Backdrop />
        <Portal>
          <Dialog.Positioner>
            <Dialog.Content
              bg="transparent"
              boxShadow="none"
              p="0"
              w="auto"
              maxW="min(95vw, 1200px)"
            >
              <Dialog.Body p="0">
                {selected ? (
                  <Box position="relative">
                    <Image
                      src={selected.src}
                      alt={selected.alt}
                      maxH="85vh"
                      maxW="95vw"
                      objectFit="contain"
                    />
                    <Dialog.CloseTrigger asChild>
                      <Icon
                        position="absolute"
                        top="0.5em"
                        right="0.5em"
                        size="2xl"
                        cursor="pointer"
                        color="white"
                        bg="rgba(0,0,0,0.55)"
                        borderRadius="full"
                        p="0.15em"
                        _hover={{ bg: "rgba(0,0,0,0.75)" }}
                        aria-label="Bezárás"
                      >
                        <IoClose />
                      </Icon>
                    </Dialog.CloseTrigger>
                  </Box>
                ) : null}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </section>
  );
}

