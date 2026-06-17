import { describe, it } from 'vitest';

/**
 * PRD-5 · 리뷰 논리 엔진 — AC verification suite.
 * Scenarios from docs/tests/logic-engine.md. Pending until the module is built.
 */
describe('logic-engine (PRD-5)', () => {
  it.todo('AC5-1: 결론 도출 — 모든 결론이 최소 1개 주장과 연결, "맨몸 결론" 없음');
  it.todo('AC5-2: 주장–근거 분리 기록 — 주장은 고유 식별자+근거 집합, 독립 조회 가능');
  it.todo('AC5-3: 주장의 관점 귀속 — 모든 주장이 ≥1 관점에 귀속, 역추적 가능');
  it.todo('AC5-4: 논리 체인 구성 — 결론에서 역방향으로 선행 주장까지 도달');
  it.todo('AC5-5: 단계별 디버깅 뷰 — 한 단계(주장+근거)만 펼쳐 조회');
});
