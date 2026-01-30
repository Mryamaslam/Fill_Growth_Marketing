/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Configure basePath and assetPrefix for GitHub Pages repository
  // Repository name: Fill_Growth_Marketing
  // GitHub Pages URL: https://mryamaslam.github.io/Fill_Growth_Marketing/
  basePath: process.env.NODE_ENV === 'production' ? '/Fill_Growth_Marketing' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Fill_Growth_Marketing' : '',
  
  // Disable image optimization (required for static export)
  images: {
    unoptimized: true,
  },
  
  // Disable features not supported in static export
  compress: false, // Compression handled by GitHub Pages
  poweredByHeader: false,
  
  // Note: Headers, rewrites, and redirects are not supported in static export
}

module.exports = nextConfig
