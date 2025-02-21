/** @type {import('next').NextConfig} */

import withVideos from "next-videos";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maxnova.blr1.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withVideos(nextConfig);
