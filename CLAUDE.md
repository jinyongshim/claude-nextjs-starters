# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 중요: Next.js 16 주의사항

이 프로젝트는 Next.js 16을 사용하며, 기존 버전과 breaking changes가 있습니다. 코드 작성 전 반드시 `node_modules/next/dist/docs/` 내 관련 가이드를 읽고 deprecation 경고에 유의하세요.

주요 차이점:
- 미들웨어 파일명: `middleware.ts` 대신 `proxy.ts` 사용
- `cookies()` 등 비동기 API는 반드시 `await` 필요
- React 19 canary 기능 사용

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 환경 변수

`.env.local` 파일에 아래 값 필요:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Supabase 타입 갱신:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

## 아키텍처

### 라우트 그룹 구조

| 그룹 | 경로 | 레이아웃 |
|------|------|---------|
| `(auth)` | `/login`, `/register` | 중앙 카드 (헤더/푸터 없음) |
| `(dashboard)` | `/dashboard` | 사이드바 + 헤더 (인증 필요) |
| `(marketing)` | `/` | 헤더 + 푸터 |

### 인증 흐름

`proxy.ts`(Next.js 16 미들웨어)가 모든 요청을 가로챔:
- 미인증 + `/dashboard` 접근 → `/login?redirectTo=...` 리다이렉트
- 인증됨 + `/login`, `/register` 접근 → `/dashboard` 리다이렉트
- Supabase SSR 클라이언트로 토큰 자동 갱신

### Supabase 클라이언트 사용 규칙

| 상황 | 사용할 import |
|------|--------------|
| Client Component | `lib/supabase/client.ts` → `createClient()` |
| Server Component / Server Action | `lib/supabase/server.ts` → `createClient()` |

`lib/supabase/client.ts`의 `isSupabaseConfigured()`로 설정 여부를 먼저 확인할 수 있음.

### 상태 관리

- **서버 상태**: React Query (`providers/query-provider.tsx`) — staleTime 5분, retry 1회
- **UI 상태**: Zustand (`stores/ui-store.ts`) — 사이드바 열림/닫힘
- **테마**: next-themes (`providers/theme-provider.tsx`)

### 폼 패턴

모든 폼은 React Hook Form + Zod를 사용. 스키마는 `lib/validations/`에 정의.

```typescript
// 예시: lib/validations/auth.ts 참고
const schema = z.object({ ... })
const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
```

### 데이터베이스 타입

`lib/supabase/types.ts`에 Supabase DB 타입 정의. 현재 `profiles` 테이블:
- `id` (UUID), `email`, `full_name`, `avatar_url`, `created_at`, `updated_at`

## 주요 유틸리티

- `lib/utils.ts` — `cn()`: clsx + tailwind-merge 조합
- `hooks/use-user.ts` — 현재 Supabase 인증 유저 조회 (auth 상태 구독)
- `hooks/use-mobile.ts` — 모바일 여부 감지 (미디어쿼리)
- `hooks/use-toast.ts` — Sonner 토스트 알림

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add <component-name>
```

스타일: `radix-nova`, CSS 변수 사용, Lucide 아이콘.
