"use client";

import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/react";

type GalleryImage = {
  src: string;
  alt: string;
};

const sources = [
  "/gallery/giorgio-manenti-R3AhZjo8uLw-unsplash.jpg",
  "/gallery/jonathan-borba-OhU7gVp0D7c-unsplash.jpg",
  "/gallery/markus-spiske-kK7uPfb2YWU-unsplash.jpg",
];

const images: GalleryImage[] = Array.from({ length: 20 }, (_, i) => ({
  src: sources[i % sources.length],
  alt: `Minta fotó ${i + 1} – villanyszerelési munkák`,
}));

export default function Gallery() {
  return (
    <section id="gallery">
      <Box
        minH={{ base: "auto", md: "100vh" }}
        padding="clamp(1rem, 4vw, 3rem)"
        bg="white"
      >
        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          marginBottom="1.5em"
          color="secondary"
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
            >
              <Image
                src={img.src}
                alt={img.alt}
                width="100%"
                height={{ base: "140px", md: "180px", lg: "200px" }}
                objectFit="cover"
                loading="lazy"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </section>
  );
}

