import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@melya/core"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
