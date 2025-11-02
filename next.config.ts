import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   nodeMiddleware: true, // ✅ Enable Node.js middleware support
  // },
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'res.cloudinary.com',],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // sometimes Unsplash redirects here
      },
    ],
    
  },
  /* config options here */
};

export default nextConfig;
