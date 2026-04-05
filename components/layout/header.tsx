import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Button } from '@/components/ui/button'

// 마케팅 페이지 헤더
// 로고, 네비게이션, 테마 토글, CTA 버튼으로 구성
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        {/* 로고 */}
        <Logo />

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            기능
          </Link>
          <Link
            href="/#pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            요금제
          </Link>
          <Link
            href="/#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            소개
          </Link>
        </nav>

        {/* 우측 액션 영역 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">로그인</Link>
            </Button>
            <Button asChild>
              <Link href="/register">무료로 시작하기</Link>
            </Button>
          </div>
          {/* 모바일 메뉴 */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
