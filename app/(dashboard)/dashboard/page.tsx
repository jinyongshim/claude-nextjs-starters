import type { Metadata } from "next";

// 대시보드 페이지는 동적 렌더링 (인증 보호)
export const dynamic = 'force-dynamic';

import {
  Users,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "대시보드",
};

const statCards = [
  {
    title: "총 사용자",
    value: "12,345",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "지난 달 대비",
  },
  {
    title: "월 매출",
    value: "₩2,340,000",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    description: "지난 달 대비",
  },
  {
    title: "신규 주문",
    value: "573",
    change: "-3%",
    trend: "down",
    icon: ShoppingCart,
    description: "지난 달 대비",
  },
  {
    title: "성장률",
    value: "23.5%",
    change: "+4.5%",
    trend: "up",
    icon: TrendingUp,
    description: "지난 분기 대비",
  },
];

const recentActivity = [
  { id: 1, user: "김철수", action: "새 계정 생성", time: "방금 전" },
  { id: 2, user: "이영희", action: "결제 완료", time: "5분 전" },
  { id: 3, user: "박민준", action: "프로필 업데이트", time: "12분 전" },
  { id: 4, user: "최지원", action: "구독 취소", time: "1시간 전" },
  { id: 5, user: "정수현", action: "로그인", time: "2시간 전" },
];

// 대시보드 메인 페이지
// 통계 카드 + 최근 활동 목록
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">
          전체 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge
                  variant={card.trend === "up" ? "default" : "destructive"}
                  className="text-xs px-1.5"
                >
                  {card.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {card.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 하단 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 최근 활동 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">최근 활동</CardTitle>
            </div>
            <CardDescription>최근 사용자 활동 내역입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{item.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.action}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 빠른 시작 가이드 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">빠른 시작 가이드</CardTitle>
            <CardDescription>
              스타터킷 설정을 완료하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                { step: 1, label: ".env.local 에 Supabase 키 설정", done: false },
                { step: 2, label: "Supabase 프로젝트 생성", done: false },
                { step: 3, label: "데이터베이스 스키마 설정", done: false },
                { step: 4, label: "컴포넌트 커스터마이징", done: false },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                      item.done
                        ? "bg-primary text-primary-foreground"
                        : "border-2 text-muted-foreground"
                    }`}
                  >
                    {item.step}
                  </div>
                  <span
                    className={`text-sm ${
                      item.done
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
