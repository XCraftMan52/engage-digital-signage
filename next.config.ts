import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'se-images.campuslabs.com',
        port: '',
        pathname: '/clink/images/**',
      },
      {
        protocol: 'https',
        hostname: 'static.campuslabsengage.com',
        port: '',
        pathname: '/discovery/images/**',
      },
    ],
  },
};

export default nextConfig;
