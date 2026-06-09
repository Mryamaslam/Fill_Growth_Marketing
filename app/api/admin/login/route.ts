import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE_NAME, generateSessionToken } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  const { username, password, logout } = await request.json()

  const envUsername = process.env.ADMIN_USERNAME
  const envPassword = process.env.ADMIN_PASSWORD

  if (!envUsername || !envPassword) {
    return NextResponse.json(
      { error: 'Admin credentials are not configured on the server.' },
      { status: 500 }
    )
  }

  if (logout) {
    const res = NextResponse.json({ success: true })
    res.cookies.set(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
    return res
  }

  if (username === envUsername && password === envPassword) {
    const token = generateSessionToken()
    const res = NextResponse.json({ success: true })
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    })
    return res
  }

  return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
}

