/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1'
const isGitHubPages = process.env.NODE_ENV === 'production' && !isVercel

const nextConfig = {
  reactStrictMode: true,

  // Static export only for GitHub Pages (Vercel needs server/API routes)
  ...(isGitHubPages ? { output: 'export' } : {}),

  basePath: isGitHubPages ? '/Fill_Growth_Marketing' : '',
  assetPrefix: isGitHubPages ? '/Fill_Growth_Marketing' : '',

  images: {
    unoptimized: true,
  },

  compress: !isGitHubPages,
  poweredByHeader: false,
}

module.exports = nextConfig
