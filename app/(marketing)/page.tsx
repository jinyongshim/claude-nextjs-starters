// 홈 페이지는 app/page.tsx 에서 처리됩니다.
// (marketing) 라우트 그룹은 features, pricing 등 서브 페이지에 공통 레이아웃을 제공합니다.
// Next.js 빌드를 위해 default export 가 필요합니다.
import { notFound } from 'next/navigation'

export default function MarketingRootPage() {
  notFound()
}
