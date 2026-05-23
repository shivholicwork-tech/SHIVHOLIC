/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@ai-seo/shared'],
};

module.exports = nextConfig;
