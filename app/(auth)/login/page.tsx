import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

// 인증 페이지는 동적 렌더링 (Supabase 세션 확인 필요)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "로그인",
  description: "계정에 로그인하세요.",
};

// 로그인 페이지
export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
        <p className="text-sm text-muted-foreground mt-1">
          이메일과 비밀번호를 입력하세요.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
