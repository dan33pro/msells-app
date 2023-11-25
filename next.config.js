/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://34.16.138.227:3102/api/auth/:path*',
        permanent: true,
        basePath: false,
      },
      {
        source: '/api/:path*',
        destination: 'http://34.16.138.227:3103/api/:path*',
        permanent: true,
        basePath: false,
      },
      {
        source: '/Roles/',
        destination: 'http://34.16.138.227:3101/Roles/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;