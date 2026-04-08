import Link from "next/link";
import { Logo } from "@/components/common/logo";

// 인증 레이아웃: 중앙 정렬 카드 형태 (헤더/푸터 없음)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* 로고 */}
        <div className="flex justify-center">
          <Logo href="/" />
        </div>
        {/* 폼 카드 (Card 컴포넌트 내부에서 처리) */}
        {children}
        {/* 하단 안내 */}
        <p className="text-center text-xs text-muted-foreground">
          계속 진행하면{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
            이용약관
          </Link>{" "}
          및{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
            개인정보처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
