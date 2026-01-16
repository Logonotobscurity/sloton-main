/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'uxwing.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
      },
       {
        protocol: 'https',
        hostname: 'www.servicenow.com',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      }
    ],
  },
};

module.exports = nextConfig;
