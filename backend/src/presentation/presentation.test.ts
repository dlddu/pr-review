import { describe, it } from 'vitest';

/**
 * PRD-7 · 리뷰 결과 표현 (인지 순서) — AC verification suite.
 * Scenarios from docs/tests/presentation.md. Pending until the module is built.
 */
describe('presentation (PRD-7)', () => {
  it.todo('AC7-1: 고정 인지 순서 렌더링 — 출력 섹션이 정의된 1~6 순서와 정확히 일치');
  it.todo('AC7-2: 점진적 펼침 — 결론까지만 보고 핵심 파악, 하위는 on-demand');
  it.todo('AC7-3: PR 내용 요약 우선 표시 — 첫 섹션이 요약, 메타데이터/컨텍스트 핵심 반영');
  it.todo('AC7-4: 단계 간 일관된 참조(드릴다운) — 주장→관점·근거, 공백→제안 이동');
});
