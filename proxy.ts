import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Supabase 환경변수 설정 여부 확인 (proxy에서는 직접 체크)
function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return (
    !!url &&
    !!key &&
    url !== 'your_supabase_project_url' &&
    key !== 'your_supabase_anon_key' &&
    url.startsWith('http')
  )
}

// Next.js 16: middleware.ts 대신 proxy.ts 사용
// 대시보드 라우트 인증 보호 및 세션 갱신 처리
export async function proxy(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  // Supabase 미설정 시 인증 체크 스킵 (로컬 개발/UI 미리보기용)
  if (!isSupabaseConfigured()) {
    return supabaseResponse
  }

  let response = supabaseResponse

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 세션 갱신 (토큰 만료 시 자동 갱신)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // 대시보드 접근 시 인증 확인
  if (pathname.startsWith('/dashboard') && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 이미 로그인된 상태에서 인증 페이지 접근 시 대시보드로 이동
  if ((pathname === '/login' || pathname === '/register') && user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
