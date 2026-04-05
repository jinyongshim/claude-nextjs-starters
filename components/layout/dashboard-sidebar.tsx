'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FileText,
  Bell,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/common/logo'
import { UserAvatarMenu } from '@/components/common/user-avatar-menu'
import { cn } from '@/lib/utils'

const navItems = [
  {
    group: '메인',
    items: [
      { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
      { href: '/dashboard/analytics', label: '분석', icon: BarChart3 },
      { href: '/dashboard/reports', label: '리포트', icon: FileText },
    ],
  },
  {
    group: '관리',
    items: [
      { href: '/dashboard/users', label: '사용자', icon: Users },
      { href: '/dashboard/notifications', label: '알림', icon: Bell },
      { href: '/dashboard/settings', label: '설정', icon: Settings },
    ],
  },
]

// 대시보드 사이드바
// shadcn/ui Sidebar 컴포넌트 기반
export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <Logo href="/dashboard" />
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((section) => (
          <SidebarGroup key={section.group}>
            <SidebarGroupLabel>{section.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive =
                    item.href === '/dashboard'
                      ? pathname === '/dashboard'
                      : pathname.startsWith(item.href)

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <Link
                          href={item.href}
                          className={cn(isActive && 'font-medium')}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <UserAvatarMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
