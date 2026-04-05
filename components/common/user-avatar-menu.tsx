'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'

// 헤더/사이드바에 표시되는 유저 아바타 + 드롭다운 메뉴
export function UserAvatarMenu() {
  const router = useRouter()
  const { user } = useUser()
  const { success, error } = useToast()
  const supabase = createClient()

  const handleSignOut = async () => {
    if (!supabase) {
      router.push('/login')
      return
    }
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      error('로그아웃에 실패했습니다.')
      return
    }
    success('로그아웃되었습니다.')
    router.push('/login')
    router.refresh()
  }

  // 이메일에서 이니셜 추출
  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="유저 메뉴 열기"
        >
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={user?.user_metadata?.avatar_url as string | undefined}
              alt="프로필 이미지"
            />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {(user?.user_metadata?.full_name as string) ?? '사용자'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
          <User className="mr-2 h-4 w-4" />
          프로필
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          설정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
