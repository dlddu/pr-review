import { describe, it } from 'vitest';

/**
 * PRD-3 · 동적 평가 관점 관리 — AC verification suite.
 * Scenarios from docs/tests/perspectives.md. Pending until the module is built.
 */
describe('perspectives (PRD-3)', () => {
  it.todo('AC3-1: 관점 생성 — 식별자/설명/평가 기준을 갖추고 후보로 노출');
  it.todo('AC3-2: 관점 삭제 — 새 리뷰 후보에서 제외, 과거 기록은 추적 가능(소프트 삭제)');
  it.todo('AC3-3: 관점 적용 — 적용된 관점만 주장 생성에 사용');
  it.todo('AC3-4: 관점–주장 추적성 — 주장↔관점 양방향 이동 가능');
});
