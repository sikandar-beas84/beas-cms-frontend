/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/assets/img/**',
      },
    ],
  },

  webpack: (config, { dev, isServer }) => {
    // Disable Webpack cache only in development mode
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
