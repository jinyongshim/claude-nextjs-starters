# 재사용 컴포넌트 생성

인자: `$ARGUMENTS` (예: `UserCard`, `common/EmptyState`, `auth/SocialButtons`)

## 지시사항

주어진 이름으로 재사용 가능한 React 컴포넌트를 생성한다.

### 1단계: 폴더 분류

인자에 폴더가 명시되지 않은 경우, 이름을 분석하여 적절한 폴더를 제안한다:
- 인증 관련 (Login, Register, Auth, Social) → `components/auth/`
- 레이아웃 관련 (Header, Sidebar, Footer, Nav) → `components/layout/`
- UI 기본 요소 (Button, Card, Badge, Table) → `components/ui/`
- 그 외 공통 컴포넌트 → `components/common/`

사용자에게 폴더 선택을 확인한다.

### 2단계: 컴포넌트 상세 확인

다음을 질문한다:
1. 필요한 Props는 무엇인가? (없으면 기본 구조만 생성)
2. 클라이언트 상호작용이 필요한가? (`"use client"` 필요 여부)
3. 데이터 fetch가 필요한가? (서버/클라이언트 중 어느 쪽인지)

### 3단계: 파일 생성

**기본 보일러플레이트:**
```tsx
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  className?: string;
  // Props 추가
}

export function ComponentName({ className }: ComponentNameProps) {
  return (
    <div className={cn("", className)}>
      {/* 컴포넌트 내용 */}
    </div>
  );
}
```

**규칙 준수:**
- `any` 타입 사용 금지 — 모든 Props 명시적 타입 정의
- `cn()` 유틸로 className 병합 (`@/lib/utils` import)
- 반응형 클래스 기본 포함 (mobile-first)
- shadcn/ui 컴포넌트 재사용 우선
- 절대경로(`@/`) 사용

### 4단계: 완료 안내

- 생성된 파일 경로 출력
- 사용 예시 코드 제공
