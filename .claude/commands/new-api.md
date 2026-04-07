# API Route Handler 생성

인자: `$ARGUMENTS` (예: `users/profile`, `posts`, `auth/session`)

## 지시사항

Next.js 16 App Router 패턴으로 API Route Handler를 생성한다.

### 1단계: 확인 질문

1. 필요한 HTTP 메서드는? (GET / POST / PATCH / DELETE)
2. 인증이 필요한 엔드포인트인가?
3. 요청 body의 필드는 무엇인가? (POST/PATCH인 경우)
4. Supabase 테이블과 연동이 필요한가?

### 2단계: 파일 생성

경로: `app/api/$ARGUMENTS/route.ts`

**기본 보일러플레이트:**

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 요청 DTO 스키마
const requestSchema = z.object({
  // 필드 정의
});

type RequestDto = z.infer<typeof requestSchema>;

// 응답 DTO 타입
interface ResponseDto {
  data: unknown | null;
  error: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json<ResponseDto>(
        { data: null, error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    // 비즈니스 로직

    return NextResponse.json<ResponseDto>({ data: null, error: null });
  } catch (error) {
    console.error("[API] GET 오류:", error);
    return NextResponse.json<ResponseDto>(
      { data: null, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json<ResponseDto>(
        { data: null, error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json() as unknown;
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ResponseDto>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    // 비즈니스 로직

    return NextResponse.json<ResponseDto>(
      { data: null, error: null },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API] POST 오류:", error);
    return NextResponse.json<ResponseDto>(
      { data: null, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
```

### 규칙

- 모든 응답은 `{ data, error }` 형식 유지
- Zod로 요청 body 검증 필수
- `any` 타입 금지
- 에러 로깅 포함 (`console.error`)
- HTTP 상태 코드 정확히 사용 (200, 201, 400, 401, 403, 404, 500)
