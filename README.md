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
├── design-system/      # 디자인 시스템 (모든 mockup이 공유하는 단일 소스)
│   ├── README.md           # 토큰·컴포넌트(C-*)·패턴(P-*) 문서
│   └── tokens.css          # 시각 토큰·컴포넌트 정의 (모든 화면이 link)
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
