'use client'

import { usePathname } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ThemeToggle } from '@/components/common/theme-toggle'

// 경로에서 브레드크럼 생성
function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    // 경로 문자열을 읽기 쉬운 레이블로 변환
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    return { href, label, isLast: index === segments.length - 1 }
  })
}

// 대시보드 상단 헤더
// 사이드바 토글 + 브레드크럼 + 테마 토글
export function DashboardHeader() {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4">
      {/* 사이드바 토글 버튼 */}
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />

      {/* 브레드크럼 */}
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* 우측 액션 */}
      <ThemeToggle />
    </header>
  )
}
