/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/v1/:path*", // Frontend-e ei path-e call korle
//         destination: "https://thread-tan-pi.vercel.app/api/:path*", // Backend-er original link-e chole jabe
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
