import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Match the logo and the 320/400/480px content images, including Retina sizes.
    imageSizes: [32, 40, 48, 64, 80, 96, 128, 256, 288, 320, 384, 400, 480, 576],
    deviceSizes: [640, 750, 800, 828, 960, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
