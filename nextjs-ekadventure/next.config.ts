import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io", "r2.ekadventure.com", "i0.wp.com"],
    remotePatterns: [
      { protocol: 'https', hostname: 'ekadventure.com', pathname: '/cdn-cgi/image/**' }
    ]
  }
};

export default nextConfig;
