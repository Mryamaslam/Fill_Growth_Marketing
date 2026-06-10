// Base path for GitHub Pages deployment. Must match next.config.js basePath.
// next/image does not automatically prepend basePath to public assets in
// static export, so we prepend it manually for local images.
export const basePath = process.env.NODE_ENV === 'production' ? '/Fill_Growth_Marketing' : ''

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path
  return `${basePath}${path}`
}
