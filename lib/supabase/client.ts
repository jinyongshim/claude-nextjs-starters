import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/supabase/types'

// Supabase 환경변수 설정 여부 확인
export function isSupabaseConfigured() {
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

// 클라이언트 컴포넌트에서 사용하는 Supabase 브라우저 클라이언트
// 환경변수 미설정 시 null 반환
export function createClient() {
  if (!isSupabaseConfigured()) return null

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
