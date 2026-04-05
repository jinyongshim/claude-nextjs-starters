import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'
import { isSupabaseConfigured } from '@/lib/supabase/client'

// 서버 컴포넌트 / Server Action에서 사용하는 Supabase 서버 클라이언트
// Next.js 16: cookies()는 반드시 await 필요
// 환경변수 미설정 시 null 반환
export async function createClient() {
  if (!isSupabaseConfigured()) return null

  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component에서 호출된 경우 쿠키 설정 무시
          }
        },
      },
    }
  )
}
