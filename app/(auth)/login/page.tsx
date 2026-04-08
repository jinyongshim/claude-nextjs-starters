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
  return <LoginForm />;
}
