import { describe, it } from 'vitest';

/**
 * PRD-1 · PR 메타데이터 추출 — AC verification suite.
 * Scenarios from docs/tests/metadata.md. Pending until the module is built.
 */
describe('metadata (PRD-1)', () => {
  it.todo('AC1-1: 작업 유형 분류 — 정의된 유형 집합으로 매핑, 불명확 시 "미분류"');
  it.todo('AC1-2: PR 작성자 식별 — 봇이면 실제 유저 추정 + 근거, 불가 시 "추정 불가"');
  it.todo('AC1-3: 저장소 식별 — KB 저장소 키와 일치');
  it.todo('AC1-4: 메타데이터의 지식 키 정규화 — 동일 인물 봇/직접 PR이 동일 키');
});
