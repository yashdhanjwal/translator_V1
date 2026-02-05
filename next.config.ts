import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is recommended for Hostingial to avoid memory limits
  output: 'export',
  // trailingSlash improves compatibility with static hosting on cPanel
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
