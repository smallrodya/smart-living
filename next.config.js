/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/category/bedding/shop-duvet-set-by-type',
        destination: '/shop-duvet-set-by-type',
      },
      {
        source: '/category/:path*/shop-duvet-set-by-type',
        destination: '/shop-duvet-set-by-type',
      },
      {
        source: '/adminpanel/login',
        destination: '/adminpanel/login',
        has: [
          {
            type: 'header',
            key: 'x-requested-with',
            value: '(?!XMLHttpRequest).*',
          },
        ],
      }
    ];
  },
};

module.exports = nextConfig; 