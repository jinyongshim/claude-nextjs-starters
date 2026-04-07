# shadcn/ui 컴포넌트 추가

인자: `$ARGUMENTS` (예: `data-table`, `calendar`, `combobox`)

## 지시사항

shadcn/ui 컴포넌트를 프로젝트에 추가하고 사용 준비 상태로 만든다.

### 1단계: 설치

```bash
npx shadcn@latest add $ARGUMENTS
```

설치 완료 후 `components/ui/` 에 생성된 파일을 확인한다.

### 2단계: 의존성 확인

설치된 컴포넌트의 import를 읽고, 추가로 설치해야 할 패키지가 있으면 안내한다.

### 3단계: 사용 예시 제공

이 프로젝트의 스타일 기준에 맞는 사용 예시를 출력한다:

- 테마: `radix-nova` 스타일 (CSS 변수 기반)
- 아이콘: Lucide React
- className 병합: `cn()` 유틸 (`@/lib/utils`)
- 절대경로 import 사용

**예시 (data-table인 경우):**
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
```

### 4단계: 관련 컴포넌트 안내

추가한 컴포넌트와 함께 자주 사용하는 shadcn/ui 컴포넌트가 있으면 함께 안내한다.

예: `data-table` → `pagination`, `input`(검색) 함께 사용 권장
