import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 마케팅 레이아웃: 헤더 + 메인 콘텐츠 + 푸터
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
