/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "example.com",
          },
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
          },
        ], // Allow images from Sanity
      },
};

export default nextConfig;