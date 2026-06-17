# 리뷰 렌즈(Lens) Mockup 인덱스

리뷰 렌즈가 **실제로 보여줄 화면**의 목업을 모은 폴더. 추상적인 여정 단계마다 조각을 만드는 대신, 사용자가 한 번에 마주하는 **화면 단위**로 묶었다. 4개 화면이 4개 여정의 18개 단계를 모두 덮는다.

이 문서가 **mockup ↔ 여정·단계 ↔ 가치 ↔ 디자인 시스템 연결의 단일 소스**다. 목업을 추가/수정/삭제하면 반드시 이 표와 [`../user-journeys/README.md`](../user-journeys/README.md), [`../doc-tracker.md`](../doc-tracker.md)를 함께 갱신한다.

> 시각 토큰·컴포넌트 정의의 정식 소스는 [`../../frontend/src/styles/tokens.css`](../../frontend/src/styles/tokens.css), 설명 문서는 [`../design-system/`](../design-system/). 가치 정의는 [`../values.md`](../values.md). 여정 정의는 [`../user-journeys/`](../user-journeys/).

## 화면 미리보기

브라우저에서 [`index.html`](./index.html)을 열면 4개 화면을 갤러리로 모아 볼 수 있다. (갤러리는 도구이며 제품 가치에 매핑되는 화면이 아니다.)

## 화면 목록

| # | 화면 | 파일 | 덮는 여정·단계 | 시각화 가치 |
|---|------|------|----------------|-------------|
| 1 | 리뷰 상세 | [review-detail.html](./review-detail.html) | J1 S1–S5, J2 S1, J3 S4 | V1·V2·V5 |
| 2 | 보정 근거 | [calibration.html](./calibration.html) | J3 S1–S3 | V3·V4 |
| 3 | 공백 보완 → 재리뷰 | [gap-fill.html](./gap-fill.html) | J2 S2–S5 | V5 |
| 4 | 지식 보강 | [knowledge-augment.html](./knowledge-augment.html) | J4 S1–S4 | V4 |

→ **고아 목업 없음**(모든 화면이 ≥1개 여정 단계에 연결), **시각화 누락 단계 없음**(18단계 전부 덮임).

## 여정 단계 → 화면 매핑 (역방향 추적)

각 여정 단계가 어느 화면의 어느 부분에서 시각화되는지.

### J1: 자동 리뷰 소비 → 신뢰 검증
| 단계 | 화면 | 화면 내 위치 |
|------|------|--------------|
| S1 PR 요약 확인 | review-detail | 레이어 1 (PR 요약) |
| S2 결론 확인 | review-detail | 레이어 2 (결론, 하위 접힘) |
| S3 논리 펼치기 | review-detail | 레이어 3 (주장 체인) |
| S4 관점·근거 드릴다운 | review-detail | 레이어 4 (주장별 관점·근거 fold) |
| S5 종결/추가행동 | review-detail | 레이어 6 (액션 바 · 머지 금지 경계) |

### J2: 논리 공백 보완 → 재리뷰
| 단계 | 화면 | 화면 내 위치 |
|------|------|--------------|
| S1 공백 인지 | review-detail | 레이어 5 (공백 카드 G1–G3) |
| S2 보완 제안 확인 | gap-fill | 공백 카드 + 행위/정보/관점 제안 |
| S3 보강 수행 | gap-fill | 보강 입력(새 관점 폼) |
| S4 재리뷰 | gap-fill | 재리뷰 before/after diff |
| S5 종결 | gap-fill | 종결 옵션(감수 종결) · 머지 금지 주석 |

### J3: 맥락 적응형 리뷰 받기
| 단계 | 화면 | 화면 내 위치 |
|------|------|--------------|
| S1 메타데이터 추출 | calibration | 레이어 1 (메타데이터 카드) |
| S2 컨텍스트 수집 | calibration | 레이어 2 (컨텍스트 KV · "없음" 처리) |
| S3 관점 적용 | calibration | 레이어 3 (적용 관점 + 사유) |
| S4 적응된 리뷰 소비 | review-detail | 우측 레일(보정 요약) + 본문 전체 |

### J4: 부족한 메타데이터 지식 보강
| 단계 | 화면 | 화면 내 위치 |
|------|------|--------------|
| S1 부족 감지 | knowledge-augment | 부족 감지 콜아웃(저장소 0건) |
| S2 보강 제안 | knowledge-augment | 보강 제안 목록 |
| S3 지식 입력 | knowledge-augment | 입력 폼 카드(작업유형/작성자/저장소 키) |
| S4 적용 확인 | knowledge-augment | 적용 before/after diff + 키 정규화 확인 |

## 화면 → 디자인 시스템 컴포넌트 매핑

각 화면이 사용하는 [`../../frontend/src/styles/tokens.css`](../../frontend/src/styles/tokens.css)의 컴포넌트(C-*)와 패턴(P-*). 컴포넌트/패턴 정의는 [`../design-system/README.md`](../design-system/README.md) 참조.

| 화면 | 사용 컴포넌트 (C-*) | 적용 패턴 (P-*) |
|------|---------------------|-----------------|
| review-detail | C-appbar, C-pr-header, C-depth-spine, C-section, C-conclusion, C-claim/C-evidence/C-perspective-tag, C-gap-card/C-cat-tag, C-action-bar, C-no-merge-boundary, C-rail, C-chip | P-cognitive-order, P-claim-evidence, P-gap-to-suggestion, P-no-merge-boundary |
| calibration | C-appbar, C-pr-header, C-chip, C-kv, C-callout, C-perspective-tag | P-calibration |
| gap-fill | C-appbar, C-pr-header, C-gap-card/C-cat-tag, C-field, C-diff, C-action-bar, C-no-merge-boundary, C-callout, C-btn | P-gap-to-suggestion, P-augment-flow, P-rereview-diff, P-no-merge-boundary |
| knowledge-augment | C-appbar, C-pr-header, C-callout, C-field, C-kv, C-diff, C-chip | P-augment-flow, P-rereview-diff |

> 시그니처 컴포넌트 **C-depth-spine**(좌측 깊이 척추)은 리뷰 상세 화면에만 쓰인다 — "필요한 깊이까지만 내려간다"는 V2를 인지 순서(P-cognitive-order)와 함께 한 화면에서 구현하기 위함.

## 핵심 설계 원칙 (모든 화면 공통)

- **고정 인지 순서**: 요약 → 결론 → 논리 → 관점·근거 → 공백 → 재리뷰/종결. 이 순서는 어떤 화면에서도 뒤집지 않는다(PRD-7).
- **주장과 근거의 분리**: 주장(claim_id)과 근거(evidence_set)는 시각적으로 분리해 표시하고 양방향 추적 가능하게 한다(PRD-5).
- **공백은 오류가 아니라 초대**: 공백(gap)은 빨강이 아니라 오커색으로, "보완 제안"으로 이어지는 출발점으로 표현한다(PRD-6).
- **머지 금지 경계의 가시화**: 코드베이스를 바꾸는 행위는 없다는 경계를 액션 영역에 명시적 라인(C-no-merge-boundary)으로 박아 둔다(AC6-5).
- **모노스페이스 = 데이터**: 식별자(C1, E2.1)·키(author/@dlddu)·LOC는 장식이 아니라 정직한 데이터이므로 모노스페이스로 둔다.

## 갱신 규칙

목업을 추가/수정/삭제하면:
1. 이 문서의 화면 목록·단계 매핑·컴포넌트 매핑을 갱신.
2. [`../user-journeys/README.md`](../user-journeys/README.md)의 "시각화 (mockup) 상태" 표와 각 여정 문서 단계의 시각화 줄을 갱신.
3. [`../doc-tracker.md`](../doc-tracker.md)의 프론트엔드 사슬 상태·여정 매트릭스·위험 진단·변경 이력을 갱신.
4. 새 컴포넌트/패턴을 도입했으면 [`../design-system/README.md`](../design-system/README.md)에 먼저 추가하고 여기서 참조.
