# 리뷰 렌즈(Lens) 디자인 시스템

모든 목업이 공유하는 시각 언어의 **문서**. 토큰·컴포넌트 정의의 **정식 소스(source of record)는 [`frontend/src/styles/tokens.css`](../../frontend/src/styles/tokens.css)** 한 파일이며(풀스택 골격 부트스트랩 때 `design-system/`에서 이전됨), 이 문서는 그 토큰·컴포넌트·패턴을 설명한다. 각 mockup은 뷰어·단일 파일에서도 스타일이 깨지지 않도록 이 토큰을 **인라인으로 임베드**한다. 따라서 토큰을 바꾸면 정식 소스를 고친 뒤 **각 mockup에 다시 인라인**해야 한다(자동 반영 아님).

> 화면이 어떤 컴포넌트·패턴을 쓰는지는 [`../mockups/README.md`](../mockups/README.md)의 매핑 표 참조.

## 정체성

**"추론을 디버깅하는 제도(製圖) 도구."** 리뷰 렌즈의 본질은 자동 리뷰의 논리를 펼쳐 보고 신뢰 여부를 판단하게 하는 것이다. 그래서 화면은 화려한 대시보드가 아니라 **차분한 도면**처럼 보여야 한다.

- 차가운 회청 종이 위의 딥 페트롤 잉크 + **단 하나의 청록 신호색**(지금 초점/검증 지점).
- 모노스페이스는 장식이 아니라 **데이터**다 — 주장/근거 식별자, 정규화 키, LOC.
- 공백(gap)은 **오류(빨강)가 아니라 보완 초대(오커)**.
- 시그니처 = 인지 순서를 깊이로 보여주는 좌측 **depth-spine**.

## 토큰

`:root`에 정의된 CSS 변수. 색상 하드코딩 금지 — 항상 변수를 쓴다.

### 색
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--paper` | `#E7EBEC` | 앱 배경(차가운 회청 종이) |
| `--surface` / `--surface-2` | 흰 계열 | 카드·표면 |
| `--ink` | `#14242B` | 본문·구조(딥 페트롤, 순흑 아님) |
| `--ink-soft` / `--ink-faint` | 회청 | 보조·캡션 텍스트 |
| `--line` | 옅은 선 | 경계선 |
| `--accent` | `#0B6E6B` | 신호색(청록) — 지금 초점/검증 지점 |
| `--accent-soft` | `#DCEBEA` | 청록 배경 틴트 |
| `--gap` | `#9A6B12` | 공백(오커) — 오류 아님, 보완 초대 |
| `--gap-soft` | `#F0E7D2` | 공백 배경 틴트 |
| `--ok` / `--ok-soft` | 녹색 | 검증됨/보강 완료 |
| 카테고리 틴트 | 흙빛/청/보라 | 공백 분류 행위/정보/관점 |

### 타이포 · 간격 · 모양
- **폰트(IBM Plex 패밀리)**: Plex Sans(본문), Plex Sans Condensed(eyebrow/디스플레이), Plex Mono(식별자·키·LOC).
- **크기 토큰**: `--t-cap` ~ `--t-h1` (캡션→제목 스케일).
- **간격 토큰**: `--s2` ~ `--s8` (4px 베이스 스케일).
- **반경/그림자**: `--r-sm` ~ `--r-lg`, `--shadow`.

## 컴포넌트 (C-*)

정식 소스 [`frontend/src/styles/tokens.css`](../../frontend/src/styles/tokens.css)에 클래스로 정의됨. 각 항목은 파일 내 `C-…` 주석으로 찾을 수 있다.

| ID | 역할 |
|----|------|
| **C-appbar** | 상단 바(브랜드 + 화면 네비 + PR 칩) |
| **C-chip** | 작업유형/저장소/상태 칩. 변형: `chip--accent`, `chip--gap`, `chip--ghost` |
| **C-pr-header** | PR 메타데이터 헤더(제목·작성자·저장소·LOC·일정) |
| **C-depth-spine** | 🔶 시그니처. 좌측 깊이 척추 — 인지 순서를 수직 레일의 번호 노드(1–6)로. 현재 펼친 깊이까지 레일이 채워지고 활성 노드는 청록으로 빛난다 |
| **C-section** | 인지 순서 섹션(접힘/펼침, `details.fold`) |
| **C-conclusion** | 결론 블록(신뢰/조건부 신뢰 등) |
| **C-claim / C-evidence / C-perspective-tag** | 주장·근거·관점 — 주장과 근거를 시각 분리, 관점 태그로 귀속 표시 |
| **C-gap-card / C-cat-tag** | 공백 카드 + 행위/정보/관점 분류 태그 |
| **C-action-bar** | 재리뷰/종결 액션 영역 |
| **C-no-merge-boundary** | 🔶 머지 금지 명시 경계 라인 — "코드베이스를 바꾸지 않는다"를 시각화 |
| **C-rail** | 우측 보정 요약 레일 |
| **C-kv** | 키-값 목록(메타데이터/컨텍스트, "없음" 명시 포함) |
| **C-callout** | 부족 지식/경고/안내. 변형: `callout--gap`, `callout--info`, `callout--ok` |
| **C-field** | 지식/관점 입력 필드 |
| **C-diff** | 재리뷰 before/after 비교 |
| **C-btn** | 버튼(주/보조) |
| (도구) gallery/gcard | 목업 인덱스(index.html) 전용 — 제품 컴포넌트 아님 |

## 패턴 (P-*)

여러 컴포넌트를 조합해 반복적으로 쓰는 상호작용 패턴. (개념 패턴으로, 화면들이 일관되게 따른다.)

| ID | 패턴 | 설명 |
|----|------|------|
| **P-cognitive-order** | 고정 인지 순서 | 요약 → 결론 → 논리 → 관점·근거 → 공백 → 재리뷰/종결. 어떤 화면에서도 순서를 뒤집지 않고, 위에서부터 필요한 깊이까지만 펼친다(progressive disclosure). C-depth-spine + C-section. |
| **P-claim-evidence** | 주장·근거 분리 | 주장(claim_id)과 근거(evidence_set)를 시각 분리하고 관점으로 귀속, 양방향 추적. C-claim/C-evidence/C-perspective-tag. |
| **P-gap-to-suggestion** | 공백 → 제안 | 공백을 오커색으로 드러내고 행위/정보/관점으로 분류해 구체적 보완 제안으로 잇는다. C-gap-card/C-cat-tag. |
| **P-calibration** | 보정 근거 노출 | 메타데이터·컨텍스트가 어떻게 평가 관점으로 이어졌는지 한자리에서. C-kv + C-perspective-tag + C-callout. |
| **P-augment-flow** | 지식/관점 보강 | 부족 감지 → 제안 → 입력 → 적용 확인의 입력 흐름. C-callout + C-field + C-diff. |
| **P-rereview-diff** | 재리뷰 before/after | 보강 전후의 결론·공백 수·주장 변화를 비교해 보강 효과를 보여준다. C-diff. |
| **P-no-merge-boundary** | 머지 금지 경계 | 코드베이스를 바꾸는 행위가 없음을 액션 영역에 명시 라인으로 박는다(AC6-5 회귀 경계). C-no-merge-boundary. |

## 접근성 · 반응형

- 반응형(`.shell` 컨테이너 + 그리드 auto-fit), 모바일에서 패딩 축소.
- `prefers-reduced-motion` 존중(depth-spine 채움 애니메이션 비활성).
- `:focus-visible` 포커스 링 제공.

## 변경 규칙

- 색/크기/간격은 **반드시 토큰으로**. 화면에서 색을 하드코딩하지 않는다.
- 새 컴포넌트/패턴을 도입하면 (1) 정식 소스 [`frontend/src/styles/tokens.css`](../../frontend/src/styles/tokens.css)에 `C-…`/주석과 함께 추가하고 (2) 이 문서 표에 등재한 뒤 (3) [`../mockups/README.md`](../mockups/README.md)의 화면별 매핑에서 참조한다.
- 토큰을 바꾸면 모든 화면에 영향이 가므로, 변경 후 4개 화면을 모두 눈으로 확인한다.
