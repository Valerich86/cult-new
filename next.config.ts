import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone', 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hb.ru-msk.vkcloud-storage.ru', 
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'sun9-80.vkuserphoto.ru', 
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
