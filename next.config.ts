import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 100] },
};

export default nextConfig;
