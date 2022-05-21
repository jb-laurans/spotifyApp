import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname, origin } = req.nextUrl
  console.log(token)
  if (pathname.includes('/api/auth') || token) {
    console.log('pathname=>', pathname)
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(`${origin}/login`)
  }
}
