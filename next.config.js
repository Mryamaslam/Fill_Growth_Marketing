/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'docs', // Output to docs folder for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/Fill_Growth_Marketing' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Fill_Growth_Marketing' : '',
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Note: Headers are not supported in static export
}

module.exports = nextConfig
