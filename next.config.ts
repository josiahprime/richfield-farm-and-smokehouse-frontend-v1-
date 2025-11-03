import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "res.cloudinary.com"],
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async rewrites() {
    const backend =
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:5001";

    return [
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`, // add `/api` only here, not in env
      },
    ];
  },
};

export default nextConfig;
