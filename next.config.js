/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    scrollRestoration: true,
    typedRoutes: true,
    serverActions: true
  },
  webpack: (config, { dev, isServer }) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    };

    // Add support for analyzing bundle size
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    disableStaticImages: false, // Enable importing static image files
    domains: ['localhost'], // Allow local development
    remotePatterns: [
      // Tech Stack Images
      { protocol: 'https', hostname: 'zoom.us' },
      { protocol: 'https', hostname: 'teams.microsoft.com' },
      { protocol: 'https', hostname: 'webflow.com' },
      { protocol: 'https', hostname: 'outlook.office365.com' },
      { protocol: 'https', hostname: 'slack.com' },
      { protocol: 'https', hostname: 'meet.google.com' },
      // Existing patterns
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cdn4.iconfinder.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'uxwing.com' },
      { protocol: 'https', hostname: 'iconlogovector.com' },
      { protocol: 'https', hostname: 'icon2.cleanpng.com' },
      { protocol: 'https', hostname: 'registry.npmmirror.com' },
      { protocol: 'https', hostname: 'img.icons8.com' },
      { protocol: 'https', hostname: 'azure.microsoft.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'firebase.google.com' },
      { protocol: 'https', hostname: 'sredevops.org' },
      { protocol: 'https', hostname: 'git-scm.com' },
      { protocol: 'https', hostname: 'biglinden.com' },
      { protocol: 'https', hostname: 'deepforgeai.com' },
      { protocol: 'https', hostname: 'cdn-uploads.huggingface.co' },
      { protocol: 'https', hostname: 'logowik.com' },
      { protocol: 'https', hostname: 'static.stocktitan.net' },
      { protocol: 'https', hostname: 'techgalaxy.business.blog' },
      { protocol: 'https', hostname: 'contauro.com' },
      { protocol: 'https', hostname: 'primarymarkets.com' },
      { protocol: 'https', hostname: 'clock-software.com' },
      { protocol: 'https', hostname: 'espysys.com' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'ciberspring.com' },
      { protocol: 'https', hostname: 'media.tekpon.com' },
      { protocol: 'https', hostname: 'www.vectorlogo.zone' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
      { protocol: 'https', hostname: 'cdn-benkb.nitrocdn.com' },
      { protocol: 'https', hostname: 'www.servicenow.com' }
    ]
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
