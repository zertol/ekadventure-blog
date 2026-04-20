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
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        jsdom: 'jsdom',
      });
      // Also ignore jsdom during bundling
      const webpack = require('webpack');
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^jsdom$/,
        })
      );
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);