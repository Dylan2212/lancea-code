// middleware.ts (ONLY middleware in your project)
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/auth',
    '/privacy',
    '/terms',
    '/confirm-email'
  ]

  const pathname = request.nextUrl.pathname
  const isPublic = publicPaths.some((p) => pathname.startsWith(p))

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
