/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n.config");

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/onboard",
        permanent: true,
      },
    ];
  },
  output: 'standalone',
};
module.exports = nextConfig;
