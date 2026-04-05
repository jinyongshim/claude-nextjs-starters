import Link from "next/link";
import { ArrowRight, Zap, Shield, Layers } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "빠른 개발",
    description:
      "Next.js 16 + shadcn/ui 로 구축된 재사용 가능한 컴포넌트로 개발 속도를 극대화합니다.",
  },
  {
    icon: Shield,
    title: "보안 인증",
    description:
      "Supabase Auth 기반의 안전한 인증 시스템. 소셜 로그인, 이메일 인증을 즉시 활용하세요.",
  },
  {
    icon: Layers,
    title: "모던 스택",
    description:
      "TypeScript, Tailwind CSS, React Query, Zustand 등 검증된 최신 기술 스택으로 구성되었습니다.",
  },
];

// 마케팅 랜딩 홈 페이지
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col">
        {/* Hero 섹션 */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-36 gap-8">
          <Badge variant="secondary" className="px-4 py-1.5">
            Next.js 16 + Supabase 스타터킷
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            웹 개발을{" "}
            <span className="text-primary">더 빠르게</span>{" "}
            시작하세요
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            모던 기술 스택으로 구축된 스타터킷. 반복적인 초기 설정 없이 핵심
            비즈니스 로직에 집중하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/register">
                무료로 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub에서 보기
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground mt-4">
            {["Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "React Query"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full border bg-background"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </section>

        {/* Features 섹션 */}
        <section id="features" className="px-4 py-24 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                필요한 모든 것이 준비되어 있습니다
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                반복되는 보일러플레이트 코드 없이 바로 제품 개발에 착수하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 bg-background shadow-sm">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section id="pricing" className="px-4 py-24">
          <div className="container mx-auto max-w-2xl text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              지금 바로 시작하세요
            </h2>
            <p className="text-muted-foreground text-lg">
              무료로 시작하고 언제든지 업그레이드하세요.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">
                무료로 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
