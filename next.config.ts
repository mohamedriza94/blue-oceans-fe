import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development" ? true : false,
  experimental: {
    optimizePackageImports: ['@remixicon/react'],
  },
};

export default nextConfig;
