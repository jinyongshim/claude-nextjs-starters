import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  href?: string
  onClick?: () => void
}

// 공통 로고 컴포넌트
// href 를 통해 링크 목적지 변경 가능
export function Logo({ className, href = '/', onClick }: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 font-bold text-xl tracking-tight',
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
        S
      </div>
      <span>Starter</span>
    </Link>
  )
}
