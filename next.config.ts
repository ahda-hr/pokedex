import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
        port: "",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**"  
      }
    ]
  }
};

export default nextConfig;
