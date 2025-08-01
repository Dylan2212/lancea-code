import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
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

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const pathname = request.nextUrl.pathname
  const isProtectedRoute = pathname.startsWith('/lancrdashboard') || pathname.startsWith('/resetpassword')

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/noaccess'
    return NextResponse.redirect(url)
  }

  return response
}
export const config = {
  matcher: ['/lancrdashboard/:path*', '/resetpassword', '/confirm-email'],
}