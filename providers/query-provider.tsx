'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

// React Query Provider
// 서버 상태 캐싱 및 동기화를 위한 전역 Provider
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 창 포커스 시 자동 재요청 비활성화 (필요시 개별 설정)
            refetchOnWindowFocus: false,
            // 에러 시 재시도 1회
            retry: 1,
            // 5분간 데이터 신선 유지
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 devtools 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
