import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow book images from any https site (imgbb, postimages etc.)
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;