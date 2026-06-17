import { describe, expect, it } from 'vitest';
import {
  ALLOWED_REVIEW_ACTIONS,
  assertReviewOnly,
  CODEBASE_MUTATION_PERMITTED,
} from './index.js';

/**
 * PRD-6 · 논리 공백 탐지 및 보완 — AC verification suite.
 * Scenarios from docs/tests/gap-detection.md. Pending until the module is built.
 */
describe('gap-detection (PRD-6)', () => {
  it.todo('AC6-1: 비약/공백 탐지 — 근거 없는 주장·도약 결론·필요한 부재 컨텍스트 표시, 완결 체인은 0건');
  it.todo('AC6-2: 보완 제안 생성 — 공백마다 "필요한 것: (행위|정보|관점) — 구체 내용" ≥1건');
  it.todo('AC6-3: 보완 후 재리뷰 — 갱신된 결론 생성, 전후 차이 추적 가능');
  it.todo('AC6-4: 리뷰 종결 — 공백 0건 또는 사용자 감수 시 종결 상태·사유 기록');
  it.todo('AC6-5: 코드베이스 변경 행위 금지 — 머지/승인/푸시 동작 부재, PR 머지 여부 불변');
});

/**
 * AC6-5 — active regression seam for the codebase-mutation boundary.
 *
 * The full behavioral verification (against the running system's action set)
 * lives in the it.todo above. These assertions pin the *invariant* now, so any
 * future change that tries to admit a codebase-mutating action breaks the build.
 */
describe('AC6-5 boundary (regression seam)', () => {
  it('never permits codebase mutation', () => {
    expect(CODEBASE_MUTATION_PERMITTED).toBe(false);
  });

  it('allows only review-only actions (no merge/approve/push)', () => {
    expect([...ALLOWED_REVIEW_ACTIONS].sort()).toEqual(['close', 'rereview']);
    for (const forbidden of ['merge', 'approve', 'push', 'force-merge']) {
      expect(ALLOWED_REVIEW_ACTIONS as readonly string[]).not.toContain(forbidden);
    }
  });

  it('rejects a non-review action at the guard', () => {
    // @ts-expect-error — codebase-mutating actions are not assignable to ReviewAction by design.
    expect(() => assertReviewOnly('merge')).toThrow(/AC6-5/);
  });
});
