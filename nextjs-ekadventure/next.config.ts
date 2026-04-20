import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  // i18n: {
  //   locales: ['fr'],
  //   defaultLocale: 'en',
  // },
  images: {
    domains: ["cdn.sanity.io", "r2.ekadventure.com", "i0.wp.com"],
    remotePatterns: [
      { protocol: 'https', hostname: 'ekadventure.com', pathname: '/cdn-cgi/image/**' }
    ]
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);