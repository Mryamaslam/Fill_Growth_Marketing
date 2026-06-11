// GitHub Pages uses a subpath; Vercel serves from the domain root.
const isGitHubPages =
  process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1'

export const basePath = isGitHubPages ? '/Fill_Growth_Marketing' : ''

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path
  return `${basePath}${path}`
}
