import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output helps with cPanel/Node.js deployments
  output: 'standalone',
  // If you prefer static export, uncomment the line below and comment 'output: standalone'
  // output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
