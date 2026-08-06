import type {
  AuthorIdentity,
  AuthorInferenceBasis,
  Metadata,
  PullRequestRef,
  RepositoryIdentity,
  WorkType,
} from '@lens/shared';
import { UNCLASSIFIED_WORK_TYPE } from '@lens/shared';
import type { RawPullRequest } from '../adapters/github/index.js';

/**
 * PRD-1 · PR 메타데이터 추출.
 *
 * Pipeline stage 1 (input). Turns a raw PR into the metadata triple and
 * normalizes each value into a knowledge-base lookup key.
 */
export interface MetadataModule {
  /** AC1-1: classify into the owner-defined work-type set; "미분류" when unclear. */
  classifyWorkType(pr: RawPullRequest): WorkType[];

  /** AC1-2: identify the author; for bot PRs, infer the real human with basis. */
  identifyAuthor(pr: RawPullRequest): AuthorIdentity;

  /** AC1-3: identify the repository. */
  identifyRepository(ref: PullRequestRef): RepositoryIdentity;

  /** AC1-1..AC1-4: compose the full metadata, with keys normalized for the KB. */
  extract(pr: RawPullRequest): Metadata;
}

/**
 * Owner-defined work-type set (AC1-1). The set is customizable per owner; until
 * PRD-4 knowledge-base customization lands, these are the built-in defaults. A
 * PR may match more than one (AC1-1 allows multi-classification); matching is by
 * case-insensitive keyword over the PR title and body.
 */
const DEFAULT_WORK_TYPES: readonly {
  readonly label: WorkType;
  readonly patterns: readonly RegExp[];
}[] = [
  { label: '기능', patterns: [/\bfeat(ure)?\b/i, /\badd(s|ed|ing)?\b/i, /기능|추가/] },
  { label: '버그 수정', patterns: [/\bfix(es|ed|ing)?\b/i, /\bbug\b/i, /\bhotfix\b/i, /버그|수정|결함/] },
  { label: '리팩토링', patterns: [/\brefactor(ing)?\b/i, /\bcleanup\b/i, /리팩(토링)?|정리/] },
  { label: '문서', patterns: [/\bdocs?\b/i, /\breadme\b/i, /문서/] },
];

function classifyWorkType(pr: RawPullRequest): WorkType[] {
  const haystack = `${pr.title}\n${pr.body}`;
  const matched = DEFAULT_WORK_TYPES.filter((type) =>
    type.patterns.some((pattern) => pattern.test(haystack)),
  ).map((type) => type.label);
  // AC1-1: unclear → "미분류" sentinel (a PRD-6 gap target), never an error.
  return matched.length > 0 ? matched : [UNCLASSIFIED_WORK_TYPE];
}

/**
 * Normalize any author handle to a single knowledge-base key (AC1-4): lowercase,
 * drop a leading `@` and a trailing `[bot]` suffix, trim. So the same person
 * routes to the same key whether they open a PR directly or via a bot.
 */
function normalizeAuthorKey(handle: string): string {
  return handle
    .trim()
    .toLowerCase()
    .replace(/^@/, '')
    .replace(/\[bot\]$/, '')
    .trim();
}

/**
 * Infer the real human behind a bot PR from its raw signals (AC1-2), recording
 * the basis for the estimate. Returns `undefined` when no signal is present —
 * the "추정 불가" state the pipeline hands to gap detection.
 */
function inferHuman(
  signals: NonNullable<RawPullRequest['inferenceSignals']>,
): { key: string; basis: AuthorInferenceBasis[] } | undefined {
  const basis: AuthorInferenceBasis[] = [];
  let humanLogin: string | undefined;

  const commit = signals.commitAuthors?.[0];
  if (commit) {
    humanLogin ??= commit;
    basis.push({ kind: 'commit-author', detail: `commit author ${commit}` });
  }
  if (signals.triggeredBy) {
    humanLogin ??= signals.triggeredBy;
    basis.push({ kind: 'trigger-metadata', detail: `triggered by ${signals.triggeredBy}` });
  }
  if (signals.linkedIssueAssignee) {
    humanLogin ??= signals.linkedIssueAssignee;
    basis.push({
      kind: 'linked-issue-assignee',
      detail: `linked-issue assignee ${signals.linkedIssueAssignee}`,
    });
  }

  if (humanLogin === undefined) {
    return undefined;
  }
  return { key: normalizeAuthorKey(humanLogin), basis };
}

function identifyAuthor(pr: RawPullRequest): AuthorIdentity {
  const base: AuthorIdentity = {
    key: normalizeAuthorKey(pr.authorLogin),
    displayName: pr.authorLogin,
    isBot: pr.isBot,
  };
  if (!pr.isBot || !pr.inferenceSignals) {
    return base;
  }
  const inferred = inferHuman(pr.inferenceSignals);
  // 추정 불가 → leave `inferredHuman` absent (AC1-2); otherwise attach it.
  return inferred ? { ...base, inferredHuman: inferred } : base;
}

function identifyRepository(ref: PullRequestRef): RepositoryIdentity {
  // AC1-3/AC1-4: the KB repository key is the normalized `owner/repo` handle.
  return {
    key: ref.repository.trim().toLowerCase(),
    ref: `${ref.provider}:${ref.repository}`,
  };
}

function extract(pr: RawPullRequest): Metadata {
  const classified = classifyWorkType(pr);
  const unclassified = classified.length === 1 && classified[0] === UNCLASSIFIED_WORK_TYPE;
  return {
    // AC1-1: undecidable → empty types plus the `unclassified` flag (a PRD-6 target).
    workTypes: unclassified ? [] : classified,
    unclassified,
    author: identifyAuthor(pr),
    repository: identifyRepository(pr.ref),
  };
}

export const metadataModule: MetadataModule = {
  classifyWorkType,
  identifyAuthor,
  identifyRepository,
  extract,
};
