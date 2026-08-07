import { describe, expect, it } from 'vitest';
import type { RawPullRequest } from '../adapters/github/index.js';
import { contextModule } from './index.js';

/**
 * PRD-2 · 리뷰 컨텍스트 수집 — AC verification suite.
 * Scenarios from docs/tests/context.md.
 */

function makePr(overrides: Partial<RawPullRequest> = {}): RawPullRequest {
  return {
    ref: { provider: 'github', repository: 'dlddu/pr-review', number: 1 },
    title: '',
    body: '',
    authorLogin: 'octocat',
    isBot: false,
    additions: 0,
    deletions: 0,
    ...overrides,
  };
}

describe('context (PRD-2)', () => {
  it('AC2-1: 의도 파악 — 추출되면 입력 전달, 불명확 시 공백 탐지로', () => {
    // 시나리오 1: 제목/설명/연결 이슈에 의도가 드러나는 PR → 의도가 추출된다
    const clear = contextModule.collectIntent(
      makePr({
        title: 'fix: null dereference in auth guard',
        body: '## 의도\n로그인 시 세션이 없는 요청에서 가드가 터지는 문제를 막는다.\n',
      }),
    );
    expect(clear.confirmed).toBe(true);
    expect(clear.text).toContain('세션이 없는 요청');

    // 제목만 있어도 서술적이면 의도로 삼는다
    const fromTitle = contextModule.collectIntent(
      makePr({ title: 'feat: export review results as markdown' }),
    );
    expect(fromTitle.confirmed).toBe(true);
    expect(fromTitle.text).toBe('export review results as markdown');

    // 시나리오 2: 설명이 비어 있고 제목도 무의미 → "의도 불명확"(PRD-6 공백 탐지 대상)
    const unclear = contextModule.collectIntent(makePr({ title: 'WIP', body: '' }));
    expect(unclear.confirmed).toBe(false);
    expect(unclear.text).toBeUndefined();

    // 템플릿 체크리스트/주석만 남은 본문도 프로즈로 치지 않는다
    const templateOnly = contextModule.collectIntent(
      makePr({ title: 'misc', body: '<!-- 설명을 적어주세요 -->\n- [ ] 테스트 추가\n' }),
    );
    expect(templateOnly.confirmed).toBe(false);
  });

  it('AC2-2: 관련 이슈 연결 (optional) — 있으면 반영, 없으면 "관련 이슈 없음"', () => {
    // 시나리오 3: PR 설명·브랜치명의 Linear 이슈 참조가 연결된다
    const fromBody = contextModule.linkIssues(
      makePr({ body: 'Closes ENG-42 — 자세한 배경은 이슈 참조.' }),
    );
    expect(fromBody.map((issue) => issue.ref)).toEqual(['linear:ENG-42']);

    const fromBranch = contextModule.linkIssues(makePr({ headRef: 'csj/eng-42-fix-auth-guard' }));
    expect(fromBranch.map((issue) => issue.ref)).toEqual(['linear:ENG-42']);

    const fromUrl = contextModule.linkIssues(
      makePr({ body: 'https://linear.app/dlddu/issue/ENG-42/fix-auth-guard' }),
    );
    expect(fromUrl.map((issue) => issue.ref)).toEqual(['linear:ENG-42']);

    // 해석된 이슈 정보(제목)가 있으면 실려서 의도/일정 판단에 쓰인다
    const enriched = contextModule.linkIssues(
      makePr({
        body: 'Closes ENG-42',
        contextSignals: { issues: [{ ref: 'ENG-42', title: '인증 가드 NPE' }] },
      }),
    );
    expect(enriched[0]?.title).toBe('인증 가드 NPE');

    // AC 아이디(AC2-1)·인코딩 토큰(UTF-8) 같은 유사 문자열은 이슈로 오인하지 않는다
    const noise = contextModule.linkIssues(makePr({ body: 'AC2-1 검증을 UTF-8 로그로 확인했다.' }));
    expect(noise).toEqual([]);

    // 참조가 없으면 오류가 아니라 명시적 "없음"(빈 목록)
    expect(contextModule.linkIssues(makePr())).toEqual([]);
  });

  it('AC2-3: 관련 스레드 연결 (optional) — 있으면 반영, 없으면 "관련 스레드 없음"', () => {
    // 시나리오 4: Slack 스레드 링크가 있는 PR → 스레드가 연결된다
    const permalink = 'https://dlddu.slack.com/archives/C12AB34CD/p1717171717000100';
    const linked = contextModule.linkThreads(
      makePr({
        body: `논의: ${permalink}`,
        contextSignals: { threads: [{ ref: permalink, summary: '가드 예외 처리 합의' }] },
      }),
    );
    expect(linked).toHaveLength(1);
    expect(linked[0]?.ref).toBe(permalink);
    expect(linked[0]?.summary).toBe('가드 예외 처리 합의');

    // 없으면 명시적 "없음"
    expect(contextModule.linkThreads(makePr({ body: '스레드 없음' }))).toEqual([]);
  });

  it('AC2-4: 변경 규모(LOC) 측정 — 추가/삭제 라인 수치 기록', () => {
    // 시나리오 5: 추가/삭제가 섞인 PR → 수치로 기록되어 관용·깊이 판단 입력이 된다
    const size = contextModule.measureChangeSize(makePr({ additions: 128, deletions: 37 }));
    expect(size).toEqual({ additions: 128, deletions: 37 });

    // 합성 결과에도 같은 수치가 실려 하위 단계로 전달된다
    expect(contextModule.collect(makePr({ additions: 128, deletions: 37 })).changeSize).toEqual({
      additions: 128,
      deletions: 37,
    });
  });

  it('AC2-5: 일정·데드라인 컨텍스트 — 있으면 관용 판단 입력으로', () => {
    // 시나리오 6: 연결 이슈에 임박한 마감일이 있는 PR → 일정이 기록된다
    const schedule = contextModule.collectSchedule(
      makePr({
        body: 'Closes ENG-42',
        contextSignals: { issues: [{ ref: 'ENG-42', dueDate: '2026-08-10' }] },
      }),
    );
    expect(schedule?.deadline).toBe('2026-08-10');
    expect(schedule?.note).toContain('ENG-42');

    // 여러 신호가 있으면 가장 임박한 마감일이 관용 판단의 기준이 된다
    const tightest = contextModule.collectSchedule(
      makePr({
        body: 'Closes ENG-42, refs ENG-7',
        contextSignals: {
          issues: [
            { ref: 'ENG-42', dueDate: '2026-08-20' },
            { ref: 'ENG-7', dueDate: '2026-08-09' },
          ],
          releaseDate: '2026-08-31',
        },
      }),
    );
    expect(tightest?.deadline).toBe('2026-08-09');

    // 일정 신호가 전혀 없으면 부재(빈 값이 아니라 undefined)
    expect(contextModule.collectSchedule(makePr())).toBeUndefined();
  });

  it('AC2-6: optional 컨텍스트의 부재 처리 — 부재가 리뷰를 막지 않고 "없음"으로 명시', () => {
    // 시나리오 7: 관련 이슈·스레드가 모두 없는 PR → 수집이 끝까지 진행된다
    const bare = makePr({ title: 'WIP', additions: 3, deletions: 1 });
    const context = contextModule.collect(bare);

    expect(context.relatedIssues).toEqual([]);
    expect(context.relatedThreads).toEqual([]);
    expect(context.schedule).toBeUndefined();
    expect(context.changeSize).toEqual({ additions: 3, deletions: 1 });
    // 부재는 오류가 아니라 상태다: 의도 불명확도 결론을 막지 않고 공백 탐지로 넘어간다
    expect(context.intent.confirmed).toBe(false);

    // 컨텍스트가 다 갖춰진 PR도 같은 경로로 합성된다
    const full = contextModule.collect(
      makePr({
        title: 'fix: null dereference in auth guard',
        body: 'Closes ENG-42\n\nhttps://dlddu.slack.com/archives/C12AB34CD/p1717171717000100',
        headRef: 'csj/eng-42-fix-auth-guard',
        additions: 12,
        deletions: 4,
        contextSignals: { issues: [{ ref: 'ENG-42', dueDate: '2026-08-10' }] },
      }),
    );
    expect(full.relatedIssues).toHaveLength(1);
    expect(full.relatedThreads).toHaveLength(1);
    expect(full.schedule?.deadline).toBe('2026-08-10');
    expect(full.intent.confirmed).toBe(true);
  });
});
