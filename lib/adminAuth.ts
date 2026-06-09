import crypto from 'crypto'
import type { NextRequest } from 'next/server'

export const SESSION_COOKIE_NAME = 'fgm_admin_session'

function getConfig() {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!username || !password || !secret) {
    throw new Error(
      'Admin auth environment variables are not set. Please set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.'
    )
  }

  return { username, password, secret }
}

export function generateSessionToken() {
  const { username, password, secret } = getConfig()
  return crypto.createHmac('sha256', secret).update(`${username}:${password}`).digest('hex')
}

export function isAdminAuthenticatedRequest(request: NextRequest): boolean {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!token) return false
  try {
    const expected = generateSessionToken()
    return token === expected
  } catch {
    return false
  }
}
