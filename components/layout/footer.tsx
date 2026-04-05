import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  서비스: [
    { href: '/#features', label: '기능' },
    { href: '/#pricing', label: '요금제' },
    { href: '/docs', label: '문서' },
  ],
  회사: [
    { href: '/about', label: '소개' },
    { href: '/blog', label: '블로그' },
    { href: '/careers', label: '채용' },
  ],
  지원: [
    { href: '/help', label: '도움말' },
    { href: '/contact', label: '문의' },
    { href: '/status', label: '서비스 상태' },
  ],
  법적고지: [
    { href: '/privacy', label: '개인정보처리방침' },
    { href: '/terms', label: '이용약관' },
  ],
}

// 마케팅 페이지 푸터
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* 브랜드 영역 */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              빠르게 웹 개발을 시작할 수 있는 모던 스타터킷
            </p>
          </div>

          {/* 링크 섹션 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Starter. All rights reserved.</p>
          <p>Next.js + Supabase + shadcn/ui 로 구축됨</p>
        </div>
      </div>
    </footer>
  )
}
