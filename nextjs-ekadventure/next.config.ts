import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
  },
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    // Disable source maps in development for server actions
    if (dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
