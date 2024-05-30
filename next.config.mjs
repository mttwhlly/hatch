/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hatchcreatives.com",
        port: "",
        pathname: "/wp-content/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
