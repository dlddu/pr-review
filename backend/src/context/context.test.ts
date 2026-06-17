import { describe, it } from 'vitest';

/**
 * PRD-2 · 리뷰 컨텍스트 수집 — AC verification suite.
 * Scenarios from docs/tests/context.md. Pending until the module is built.
 */
describe('context (PRD-2)', () => {
  it.todo('AC2-1: 의도 파악 — 추출되면 입력 전달, 불명확 시 공백 탐지로');
  it.todo('AC2-2: 관련 이슈 연결 (optional) — 있으면 반영, 없으면 "관련 이슈 없음"');
  it.todo('AC2-3: 관련 스레드 연결 (optional) — 있으면 반영, 없으면 "관련 스레드 없음"');
  it.todo('AC2-4: 변경 규모(LOC) 측정 — 추가/삭제 라인 수치 기록');
  it.todo('AC2-5: 일정·데드라인 컨텍스트 — 있으면 관용 판단 입력으로');
  it.todo('AC2-6: optional 컨텍스트의 부재 처리 — 부재가 리뷰를 막지 않고 "없음"으로 명시');
});
