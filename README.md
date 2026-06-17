# pr-review (리뷰 렌즈 · Lens)

PR 리뷰를 자동화하되, **자동화된 리뷰를 신뢰할 수 있도록** 리뷰의 논리를 투명하게 드러내고 디버깅 가능하게 만드는 개인용 도구. (제품명은 가칭)

- 리뷰는 PR의 **메타데이터**(작업 유형 · 작성자 · 저장소)와 **컨텍스트**(의도 · 관련 이슈 · 관련 스레드 · LOC · 일정)에 맞춰 보정된다.
- 메타데이터를 키로 한 **지식이 축적**되고, 데이터가 부족하면 보강을 제안한다.
- 결론은 **주장(claim)과 근거(evidence)로 분리**되어 기록되며, 논리의 비약·공백은 드러내어 보완 제안으로 이어진다.
- **PR 머지 등 코드베이스를 바꾸는 행위는 수행하지 않는다.** (판단 보조 도구)

## 문서 체계

가치 → PRD → Acceptance Criteria → 테스트 → 상태 추적의 계층 구조. 가치에서 갈라져 나오는 **사용자 여정**(프론트엔드 사슬)도 같은 가치를 참조하며 함께 둔다.

```
docs/
├── doc-tracker.md      # 문서 체계 상태 추적 (여기서 시작 — 연결 매트릭스 · 건강 상태)
├── values.md           # 제품 가치 (V1~V5)
├── prd/                # 제품 요구사항 (PRD-1~7, AC 포함)
│   ├── metadata.md         # PR 메타데이터 추출
│   ├── context.md          # 리뷰 컨텍스트 수집
│   ├── perspectives.md     # 동적 평가 관점 관리
│   ├── knowledge-base.md   # 메타데이터 지식 베이스
│   ├── logic-engine.md     # 리뷰 논리 엔진 (주장·근거 분리)
│   ├── gap-detection.md    # 논리 공백 탐지 및 보완
│   └── presentation.md     # 리뷰 결과 표현 (인지 순서)
├── tests/              # 각 PRD의 AC 검증 테스트 (1:1 대응)
│   ├── metadata.md
│   ├── context.md
│   ├── perspectives.md
│   ├── knowledge-base.md
│   ├── logic-engine.md
│   ├── gap-detection.md
│   └── presentation.md
├── user-journeys/      # 사용자 여정 (J1~J4, 가치 → 여정 → mockup)
│   ├── README.md                     # 여정 인덱스 (여정↔가치↔mockup 단일 소스)
│   ├── review-consume-trust.md       # J1: 자동 리뷰 소비 → 신뢰 검증 (V2·V1)
│   ├── gap-fill-rereview.md          # J2: 논리 공백 보완 → 재리뷰 (V5·V1)
│   ├── context-adaptive-review.md    # J3: 맥락 적응형 리뷰 받기 (V3)
│   └── metadata-knowledge-augment.md # J4: 부족한 메타데이터 지식 보강 (V4)
├── design-system/      # 디자인 시스템 문서 (토큰 정식 소스는 frontend/src/styles/tokens.css)
│   └── README.md           # 토큰·컴포넌트(C-*)·패턴(P-*) 문서
└── mockups/            # 실제 화면 목업 (4개 화면이 18개 여정 단계를 덮음)
    ├── README.md                # mockup 인덱스 (화면↔여정·단계↔가치↔컴포넌트)
    ├── index.html               # 갤러리 (도구 — 제품 화면 아님)
    ├── review-detail.html       # 화면 1: 리뷰 상세 (J1 전체·J2 S1·J3 S4)
    ├── calibration.html         # 화면 2: 보정 근거 (J3 S1~S3)
    ├── gap-fill.html            # 화면 3: 공백 보완 → 재리뷰 (J2 S2~S5)
    └── knowledge-augment.html   # 화면 4: 지식 보강 (J4 S1~S4)
```

## 제품 가치 (요약)

| | 가치 | 유형 |
|---|------|------|
| V1 | 신뢰할 수 있는 자동 리뷰 | 추상적 |
| V2 | 최소 인지 부하로 리뷰 소비 | 구체적 |
| V3 | 맥락 적응형 평가 | 추상적 |
| V4 | 축적되는 메타데이터 지식 | 추상적 |
| V5 | 논리적 공백의 가시화와 보완 | 구체적 |

## 사용자 여정 (요약)

5개 가치를 빠짐없이 덮는 여정 4개. 단일 페르소나(제품 소유자 본인)가 공유하며, 상황·목표만 다르다. 상세·연결 매트릭스는 [`docs/user-journeys/README.md`](docs/user-journeys/README.md).

| | 여정 | 달성 가치 | mockup |
|---|------|-----------|--------|
| J1 | 자동 리뷰 소비 → 신뢰 검증 | V2, V1 | ✅ [review-detail](docs/mockups/review-detail.html) |
| J2 | 논리 공백 보완 → 재리뷰 | V5, V1 | ✅ [review-detail](docs/mockups/review-detail.html) · [gap-fill](docs/mockups/gap-fill.html) |
| J3 | 맥락 적응형 리뷰 받기 | V3 | ✅ [calibration](docs/mockups/calibration.html) · [review-detail](docs/mockups/review-detail.html) |
| J4 | 부족한 메타데이터 지식 보강 | V4 | ✅ [knowledge-augment](docs/mockups/knowledge-augment.html) |

> 실제로 보게 될 화면 기준 4개 목업이 18개 여정 단계를 모두 덮는다. 화면↔단계↔가치↔컴포넌트 매핑은 [`docs/mockups/README.md`](docs/mockups/README.md), 공유 디자인 시스템은 [`docs/design-system/`](docs/design-system/). 브라우저로 [`docs/mockups/index.html`](docs/mockups/index.html)을 열면 갤러리로 모아 볼 수 있다.

## 리뷰 결과 인지 순서

1. PR 내용 요약 → 2. 리뷰 결론 → 3. 결론을 만든 논리 → 4. 각 주장의 관점·근거 → 5. 논리 공백을 채우기 위한 제안 → 6. 보완 후 재리뷰 또는 종결

## 개발 / Getting Started

> 이 저장소는 위 문서 체계 위에 **풀스택 골격(skeleton)** 이 얹혀 있다. 골격은 빌드·린트·타입체크·테스트·실행이 전부 통과하되 **기능 로직은 아직 없다**(스텁·placeholder). 첫 동작하는 end-to-end는 후속 작업이다.

### 사전 요구
- Node LTS (`.nvmrc` = `22`)
- pnpm 10+ (`corepack enable` 또는 `npm i -g pnpm`)

### 설치 & 실행

```bash
pnpm install                          # 워크스페이스 의존성 설치
pnpm --filter @lens/backend start     # 백엔드 no-op 엔트리포인트(파이프라인 골격을 조립만)
pnpm --filter @lens/frontend dev      # 프론트 dev 서버(홈 + 4화면 placeholder 렌더)
```

### 점검 명령 (워크스페이스 전역)

```bash
pnpm -r lint        # ESLint (flat config)
pnpm -r typecheck   # tsc --noEmit
pnpm -r test        # Vitest — 33개 AC가 it.todo로 보류, AC6-5 경계 회귀 테스트는 활성
pnpm -r build       # 패키지별 빌드
```

CI(`.github/workflows/ci.yml`)가 push·PR에서 install → lint → typecheck → test → build를 같은 순서로 검증한다.

### 모노레포 구조

```
packages/shared/   # 도메인 타입 단일 출처(@lens/shared) — 백엔드·프론트가 공유
backend/           # TS/Node + SQLite(better-sqlite3). 7 PRD 모듈의 단방향 파이프라인 스텁
  src/<module>/      metadata·context·perspectives·knowledge-base·logic-engine·gap-detection·presentation
  src/adapters/      github·linear·slack 경계 스텁(read-only)
  src/db/            SQLite 부트스트랩 + 마이그레이션 자리(placeholder)
frontend/          # Vite + React + TS. 4화면 라우트 + C-* 컴포넌트 카탈로그
  src/routes/        home + review-detail·calibration·gap-fill·knowledge-augment
  src/components/    C-* placeholder 컴포넌트
  src/styles/        tokens.css — 디자인 토큰 정식 소스(=design-system 문서가 설명)
```

### 코드 골격 ↔ 문서 체계 매핑

골격의 각 조각은 문서 체계의 한 산출물을 미러링한다 — **백엔드 모듈 ↔ PRD**(`backend/src/<module>` ↔ `docs/prd/<module>.md`, 7:7), **테스트 스위트 ↔ AC**(모듈별 `*.test.ts`의 `it.todo`가 33개 AC를 1:1로 등재하고, "코드베이스를 바꾸지 않는다"는 불변식 AC6-5는 `gap-detection`에 런타임 가드 + 활성 회귀 테스트로 박혀 있다), **프론트 라우트 ↔ mockup 화면**(`frontend/src/routes/*` ↔ `docs/mockups/*.html`, 4:4), **컴포넌트 ↔ 디자인 시스템**(`frontend/src/components/C-*` ↔ `docs/design-system/`의 C-* 카탈로그), **토큰 ↔ 디자인 시스템**(`frontend/src/styles/tokens.css`가 정식 소스, `docs/design-system/`이 설명, 각 mockup이 인라인). 즉 문서가 "무엇을·왜"를, 골격이 그것이 "어디에" 얹힐지를 1:1로 고정한다.
