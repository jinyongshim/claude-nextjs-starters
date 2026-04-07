# 새 페이지 생성

인자: `$ARGUMENTS` (예: `dashboard/settings`, `login`, `about`)

## 지시사항

주어진 경로로 새 Next.js 페이지를 생성한다.

### 1단계: 라우트 그룹 판별

경로 패턴에 따라 라우트 그룹을 결정한다:
- `login`, `register` → `app/(auth)/`
- `dashboard` 또는 `dashboard/` 로 시작 → `app/(dashboard)/`
- 그 외 (랜딩, about 등) → `app/(marketing)/`

인자에 그룹이 명시되어 있으면 그것을 우선한다.

### 2단계: 사용자에게 확인

다음을 질문한다:
1. 서버 컴포넌트로 만들 것인가, 클라이언트 컴포넌트로 만들 것인가?
2. 별도 `layout.tsx`가 필요한가?
3. 페이지 제목(title)은 무엇인가?

### 3단계: 파일 생성

**서버 컴포넌트 보일러플레이트 (`(dashboard)` 그룹):**
```tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PageName() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold">페이지 제목</h1>
    </div>
  );
}
```

**클라이언트 컴포넌트 보일러플레이트:**
```tsx
"use client";

export default function PageName() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold">페이지 제목</h1>
    </div>
  );
}
```

**`(auth)` 그룹 보일러플레이트:**
```tsx
export default function PageName() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">페이지 제목</h1>
      </div>
    </div>
  );
}
```

### 4단계: 완료 안내

- 생성된 파일 경로 출력
- 필요한 경우 `proxy.ts` 미들웨어의 보호 경로 추가 여부 안내
