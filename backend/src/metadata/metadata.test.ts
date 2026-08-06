import { describe, expect, it } from 'vitest';
import { UNCLASSIFIED_WORK_TYPE } from '@lens/shared';
import type { RawPullRequest } from '../adapters/github/index.js';
import { metadataModule } from './index.js';

/**
 * PRD-1 · PR 메타데이터 추출 — AC verification suite.
 * Scenarios from docs/tests/metadata.md.
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

describe('metadata (PRD-1)', () => {
  it('AC1-1: 작업 유형 분류 — 정의된 유형 집합으로 매핑, 불명확 시 "미분류"', () => {
    // 시나리오 1: 작업 유형이 분명한 PR → 정의된 집합 중 "버그 수정"
    const bugfix = metadataModule.classifyWorkType(
      makePr({ title: 'fix: null dereference in auth guard', body: 'Fixes a bug in login.' }),
    );
    expect(bugfix).toContain('버그 수정');
    expect(bugfix).not.toContain(UNCLASSIFIED_WORK_TYPE);

    // 시나리오 2: 불명확한 PR → "미분류" (오류로 끝나지 않고 PRD-6 공백 대상이 된다)
    const unclear = metadataModule.classifyWorkType(
      makePr({ title: 'Misc', body: 'Various small tweaks.' }),
    );
    expect(unclear).toEqual([UNCLASSIFIED_WORK_TYPE]);
  });

  it('AC1-2: PR 작성자 식별 — 봇이면 실제 유저 추정 + 근거, 불가 시 "추정 불가"', () => {
    // 시나리오 3: 사람이 만든 PR → 그대로 식별
    const human = metadataModule.identifyAuthor(makePr({ authorLogin: 'Alice', isBot: false }));
    expect(human.isBot).toBe(false);
    expect(human.key).toBe('alice');
    expect(human.inferredHuman).toBeUndefined();

    // 시나리오 4a: 봇 PR + 실제 유저 흔적 → 추정 유저와 근거 기록
    const bot = metadataModule.identifyAuthor(
      makePr({
        authorLogin: 'dependabot[bot]',
        isBot: true,
        inferenceSignals: { commitAuthors: ['Alice'] },
      }),
    );
    expect(bot.isBot).toBe(true);
    expect(bot.inferredHuman?.key).toBe('alice');
    expect(bot.inferredHuman?.basis[0]?.kind).toBe('commit-author');

    // 시나리오 4b: 봇 PR + 흔적 없음 → "추정 불가"(inferredHuman 부재)
    const opaque = metadataModule.identifyAuthor(makePr({ authorLogin: 'ci-bot[bot]', isBot: true }));
    expect(opaque.inferredHuman).toBeUndefined();
  });

  it('AC1-3: 저장소 식별 — KB 저장소 키와 일치', () => {
    // 시나리오 5: 저장소 식별자가 정확히 추출되어 지식 베이스 저장소 키(owner/repo)와 일치
    const repo = metadataModule.identifyRepository({
      provider: 'github',
      repository: 'dlddu/PR-Review',
      number: 7,
    });
    expect(repo.key).toBe('dlddu/pr-review');
    expect(repo.ref).toBe('github:dlddu/PR-Review');
  });

  it('AC1-4: 메타데이터의 지식 키 정규화 — 동일 인물 봇/직접 PR이 동일 키', () => {
    // 시나리오 6: 같은 사람이 직접/봇으로 만든 두 PR → 동일 정규화 키
    const direct = metadataModule.extract(
      makePr({ authorLogin: 'Octocat', isBot: false, title: 'feat: add export' }),
    );
    const viaBot = metadataModule.extract(
      makePr({
        authorLogin: 'octocat[bot]',
        isBot: true,
        inferenceSignals: { commitAuthors: ['Octocat'] },
        title: 'feat: add export',
      }),
    );
    // 직접 PR의 author.key == 봇 PR의 inferredHuman.key (동일 인물로 통일)
    expect(viaBot.author.inferredHuman?.key).toBe(direct.author.key);
    expect(direct.author.key).toBe('octocat');
    // 정규화 키 형식이 KB 키 스키마(소문자·봇 접미사 제거)와 일치
    expect(direct.author.key).toMatch(/^[a-z0-9][a-z0-9._/-]*$/);

    // extract 합성: 저장소·작업유형이 정규화되어 함께 실린다
    expect(direct.repository.key).toBe('dlddu/pr-review');
    expect(direct.workTypes).toContain('기능');
    expect(direct.unclassified).toBe(false);

    // 불명확 합성 결과: 빈 workTypes + unclassified 플래그 (AC1-1 경로)
    const misc = metadataModule.extract(makePr({ title: 'Misc', body: 'noise' }));
    expect(misc.unclassified).toBe(true);
    expect(misc.workTypes).toEqual([]);
  });
});
