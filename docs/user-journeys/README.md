# 리뷰 렌즈(Lens) 사용자 여정 인덱스

특정 페르소나가 특정 목표를 달성하기까지의 단계 흐름을 모은 폴더. 각 여정은 **어떤 가치를 달성하는지**(V1~V5 참조)와 **각 단계가 어떤 mockup으로 시각화되는지**를 추적한다. 이 인덱스가 여정 ↔ 가치 ↔ mockup 연결의 단일 소스다.

> 가치 정의는 [`../values.md`](../values.md), 가치 → PRD → AC → 테스트의 백엔드 사슬과 전체 상태는 [`../doc-tracker.md`](../doc-tracker.md) 참조.

## 기본 페르소나

이 제품은 1인 소유(개인 프로젝트)이므로 모든 여정이 단일 페르소나를 공유한다. 여정마다 다른 것은 **상황과 목표**다.

- **리뷰 렌즈를 쓰는 개발자 본인** — 제품 소유자이자 유일 사용자. PR을 리뷰하며, 코드베이스를 바꾸는 행위(머지 등)는 하지 않고 판단만 보조받는다.

## 여정 목록 (여정 → 가치)

| ID | 여정 | 달성 가치 | 단계 수 | 파일 |
|----|------|-----------|--------|------|
| J1 | 자동 리뷰 소비 → 신뢰 검증 | V2, V1 | 5 | [review-consume-trust.md](./review-consume-trust.md) |
| J2 | 논리 공백 보완 → 재리뷰 | V5, V1 | 5 | [gap-fill-rereview.md](./gap-fill-rereview.md) |
| J3 | 맥락 적응형 리뷰 받기 | V3 | 4 | [context-adaptive-review.md](./context-adaptive-review.md) |
| J4 | 부족한 메타데이터 지식 보강 | V4 | 4 | [metadata-knowledge-augment.md](./metadata-knowledge-augment.md) |

### 가치 커버리지 (가치 → 여정)

| 가치 | 달성하는 여정 | 상태 |
|------|---------------|------|
| V1: 신뢰할 수 있는 자동 리뷰 | J1, J2 | ✅ 매핑됨 |
| V2: 최소 인지 부하로 리뷰 소비 | J1 | ✅ 매핑됨 |
| V3: 맥락 적응형 평가 | J3 | ✅ 매핑됨 |
| V4: 축적되는 메타데이터 지식 | J4 | ✅ 매핑됨 |
| V5: 논리적 공백의 가시화와 보완 | J2 | ✅ 매핑됨 |

→ 5개 가치 모두 최소 하나의 여정에 연결됨. **고아 여정 없음, 가치 누락 없음.**

## 여정 간 흐름

```
J3 맥락 적응형 리뷰 ──(지식 부족 시)──▶ J4 지식 보강 ──(보강된 재료로)──▶ J3 다시 풍부하게
        │
        ▼ (리뷰 생성됨)
J1 리뷰 소비 → 신뢰 검증 ──(논리 공백 발견 시)──▶ J2 공백 보완 → 재리뷰 ──▶ 종결
```

## 시각화 (mockup) 상태

목업은 추상적 단계마다 조각을 만드는 대신 **사용자가 한 번에 보는 화면 단위**로 묶었다. 4개 화면이 18개 단계를 모두 덮는다. 화면 단위 상세·역방향 매핑은 [`../mockups/README.md`](../mockups/README.md).

| 여정 | 단계 | 시각화 mockup |
|------|------|---------------|
| J1 | S1~S5 | ✅ [review-detail](../mockups/review-detail.html) |
| J2 | S1 | ✅ [review-detail](../mockups/review-detail.html) (레이어 5) |
| J2 | S2~S5 | ✅ [gap-fill](../mockups/gap-fill.html) |
| J3 | S1~S3 | ✅ [calibration](../mockups/calibration.html) |
| J3 | S4 | ✅ [review-detail](../mockups/review-detail.html) (우측 레일·본문) |
| J4 | S1~S4 | ✅ [knowledge-augment](../mockups/knowledge-augment.html) |

→ **시각화 누락 단계 0개.** 18개 단계 전부 화면에 연결됨. 디자인 시스템(토큰/컴포넌트/패턴)은 [`../design-system/`](../design-system/)에 정의되어 모든 화면이 공유한다.

> mockup이 추가/수정/제거될 때 이 표와 각 여정 문서의 단계별 시각화 줄, 그리고 [`../mockups/README.md`](../mockups/README.md)·[`../doc-tracker.md`](../doc-tracker.md)를 함께 갱신할 것. (인덱스 갱신 누락이 가장 흔한 실패 모드.)
