/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: standalone' for Vercel deployment
  experimental: {
    optimizePackageImports: ['recharts', '@headlessui/react'],
  },
  images: {
    domains: [],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
