import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the output file tracing root to the project directory to avoid lockfile warnings
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: ['*.e2b.app', '*.e2b.dev'],

  // Ignore TypeScript errors during build for faster deployments
  typescript: {
    ignoreBuildErrors: false, // Keep this false to catch type errors
  },
  
  // Optimize images for better performance and SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'uxwing.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
    ],
  },

  // Compress responses for better performance
  compress: true,

  // Generate ETags for better caching
  generateEtags: true,

  // Power page extensions for better organization
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Trailing slash configuration (false is better for SEO)
  trailingSlash: false,

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (example - add your specific redirects)
  async redirects() {
    return [
      {
        source: '/about/analyst-reports',
        destination: '/about/reports',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/insights',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
