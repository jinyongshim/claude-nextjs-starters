# Supabase 타입 동기화

인자: 없음

## 지시사항

Supabase 데이터베이스 스키마 변경 후 TypeScript 타입을 최신 상태로 동기화한다.

### 1단계: 환경변수 확인

`.env.local` 파일에서 Supabase 프로젝트 ID를 확인한다:

```bash
cat .env.local
```

`NEXT_PUBLIC_SUPABASE_URL` 값에서 프로젝트 ID를 추출한다.
URL 형식: `https://<PROJECT_ID>.supabase.co`

### 2단계: 타입 재생성

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> > lib/supabase/types.ts
```

### 3단계: 변경사항 확인

```bash
git diff lib/supabase/types.ts
```

새로 추가된 테이블이나 컬럼을 사용자에게 요약해서 알려준다.

### 4단계: 타입 오류 확인

```bash
npx tsc --noEmit
```

타입 변경으로 인한 오류가 있으면 영향받는 파일 목록을 안내한다.

### 주의사항

- DB 스키마 변경 후 반드시 이 커맨드를 실행할 것
- `lib/supabase/types.ts`는 자동 생성 파일이므로 직접 편집 금지
- Supabase CLI 미설치 시: `npm install -g supabase` 또는 `npx supabase` 사용
