import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

// 인증 페이지는 동적 렌더링 (Supabase 세션 확인 필요)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "회원가입",
  description: "새 계정을 만드세요.",
};

// 회원가입 페이지
export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">회원가입</h1>
        <p className="text-sm text-muted-foreground mt-1">
          아래 정보를 입력하여 계정을 생성하세요.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
