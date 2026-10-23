import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@melya/core"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // Ancien slug partagé par les deux versions du BAT (cf. lib/scale-slug.ts).
      {
        source: "/echelles/bat",
        destination: "/echelles/bat-travail",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
