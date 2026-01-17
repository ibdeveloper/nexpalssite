const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimizează pentru deploy pe cPanel
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  // Optimize fonts
  optimizeFonts: true,
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Target modern browsers to reduce polyfills
  transpilePackages: [],
  // Optimize for modern browsers
  experimental: {
    optimizePackageImports: ['framer-motion', 'next-intl'],
  },
  // Reduce JavaScript bundle size
  swcMinify: true,
  // Optimize CSS
  optimizeCss: false, // Let Next.js handle it
};

module.exports = withNextIntl(nextConfig);
