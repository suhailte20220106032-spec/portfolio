import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable Turbopack for dev mode
  turbopack: {
    // Optional: Configure Turbopack rules if needed
  },
  // Ensure proper handling of images
  images: {
    remotePatterns: [],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Configure TypeScript
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: false,
  },
  // Configure ESLint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
