import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // STEP 1: Create Supabase client using cookie-based auth
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname
  const isProtectedRoute = pathname.startsWith('/lancrdashboard')

  try {
    // STEP 2: First try getting the user from Supabase session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      return response // Authenticated via cookie/session
    }

    // STEP 3: If no user, check for a Bearer token (e.g., from client fetch requests)
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null

    if (token) {
      // Validate the token manually via Supabase Admin API or JWT decode logic
      const jwtPayload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      )

      const isValid = jwtPayload?.exp * 1000 > Date.now() // crude expiration check
      if (isValid) {
        return response // Valid token, allow access
      }
    }

    // STEP 4: Redirect if on protected route and still not authenticated
    if (isProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/noaccess'
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('Middleware auth error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/lancrdashboard/:path*'],
}