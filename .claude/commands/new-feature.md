# 기능 개발 워크플로우

인자: `$ARGUMENTS` (예: `유저 프로필 수정`, `게시글 CRUD`, `알림 기능`)

## 지시사항

새 기능을 레이어드 아키텍처에 맞게 체계적으로 개발한다.

### 1단계: 요구사항 확인 (반드시 먼저 수행)

다음 질문을 사용자에게 한다:
1. 이 기능이 영향을 미치는 라우트/페이지는 어디인가?
2. 필요한 데이터베이스 테이블/컬럼이 있는가?
3. 인증이 필요한 기능인가?
4. API Route가 필요한가, 아니면 Server Action으로 처리할 것인가?
5. UI에서 실시간 업데이트가 필요한가? (TanStack Query 쓰기 여부)

### 2단계: 파일 구조 제안

답변을 바탕으로 아래 레이어에 맞는 파일 구조를 제안한다:

```
app/
  (dashboard)/dashboard/[feature]/
    page.tsx          ← 페이지 (Controller 역할)

components/
  [feature]/
    [Feature]Form.tsx ← 폼 컴포넌트

lib/
  validations/
    [feature].ts      ← Zod 스키마
  supabase/
    [feature].ts      ← Repository (DB 쿼리)

hooks/
  use-[feature].ts    ← Service 레이어 (TanStack Query)
```

### 3단계: 순서대로 구현

아래 순서로 구현한다:

1. **Zod 스키마** (`lib/validations/[feature].ts`) — DTO 타입 정의
2. **Repository** (`lib/supabase/[feature].ts`) — Supabase 쿼리 함수
3. **Service Hook** (`hooks/use-[feature].ts`) — TanStack Query + 비즈니스 로직
4. **UI 컴포넌트** — React Hook Form 연동
5. **페이지 연결** — 서버/클라이언트 조합

### 규칙

- `any` 타입 금지
- 모든 Supabase 에러 핸들링 필수
- 절대경로(`@/`) 사용
- 서버 컴포넌트에서는 `lib/supabase/server.ts`의 `createClient()` 사용
- 클라이언트에서는 `lib/supabase/client.ts`의 `createClient()` 사용
