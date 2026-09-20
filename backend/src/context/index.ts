import type {
  ChangeSize,
  Context,
  Intent,
  IssueLink,
  ScheduleContext,
  ThreadLink,
} from '@lens/shared';
import type { RawPullRequest } from '../adapters/github/index.js';

/**
 * PRD-2 · 리뷰 컨텍스트 수집.
 *
 * Pipeline stage 1 (input). Gathers intent, related issues/threads, change
 * size, and schedule. Optional items resolve to explicit "없음" so their
 * absence never blocks the review (AC2-6).
 *
 * Like {@link ../metadata/index.js | PRD-1}, every method takes the already
 * fetched {@link RawPullRequest} rather than a bare ref: collection is pure
 * derivation over raw material, and fetching stays behind the adapters.
 */
export interface ContextModule {
  /** AC2-1: derive PR intent; unconfirmed → "의도 불명확" (a gap target). */
  collectIntent(pr: RawPullRequest): Intent;

  /** AC2-2: link related issues (optional, primarily Linear). */
  linkIssues(pr: RawPullRequest): IssueLink[];

  /** AC2-3: link related threads (optional, primarily Slack). */
  linkThreads(pr: RawPullRequest): ThreadLink[];

  /** AC2-4: measure change size in LOC. */
  measureChangeSize(pr: RawPullRequest): ChangeSize;

  /** AC2-5: collect schedule/deadline context; absent when none. */
  collectSchedule(pr: RawPullRequest): ScheduleContext | undefined;

  /** AC2-1..AC2-6: compose the full context, absence handled explicitly. */
  collect(pr: RawPullRequest): Context;
}

/**
 * Issue references are only recognized in shapes that unambiguously mean "this
 * PR is about that issue" — a Linear URL, a closing/reference keyword, or a
 * branch-name segment. A bare `ABC-123` scan would also swallow tokens like
 * `UTF-8` or this repo's own `AC2-1` ids, so it is deliberately not used.
 */
const LINEAR_URL_PATTERN = /https:\/\/linear\.app\/[^\s/]+\/issue\/([A-Za-z][A-Za-z0-9]{1,9}-\d+)/g;
const ISSUE_MENTION_PATTERN =
  /\b(?:closes?d?|fix(?:e[sd])?|resolves?d?|refs?|see|linear)\b[\s:#]*([A-Za-z][A-Za-z0-9]{1,9}-\d+)\b/gi;
const BRANCH_ISSUE_PATTERN = /(?:^|[/_-])([A-Za-z][A-Za-z0-9]{1,9}-\d+)(?:[/_-]|$)/g;

/** Slack thread permalinks (AC2-3). */
const SLACK_THREAD_PATTERN =
  /https:\/\/[a-z0-9][a-z0-9-]*\.slack\.com\/archives\/[A-Za-z0-9]+\/p\d+/g;

/** Markdown/template noise that carries no intent of its own (AC2-1). */
const HTML_COMMENT_PATTERN = /<!--[\s\S]*?-->/g;
const CHECKLIST_LINE_PATTERN = /^[ \t]*[-*][ \t]*\[[ xX]\].*$/gm;
const HEADING_LINE_PATTERN = /^[ \t]*#{1,6}[ \t]*.*$/gm;

/** An explicit intent section wins over free prose when the body has one. */
const INTENT_SECTION_PATTERN =
  /^[ \t]*#{1,6}[ \t]*(?:의도|목적|배경|why|motivation|summary|context|overview)\b[^\n]*\n([\s\S]*?)(?=\n[ \t]*#{1,6}[ \t]|$)/im;

/** Conventional-commit prefix (`feat:`, `fix(auth)!:`) — not intent by itself. */
const CONVENTIONAL_PREFIX_PATTERN = /^[a-z]+(?:\([^)]*\))?!?:\s*/i;

/** Titles that say nothing about intent; a PR carrying only one is "불명확". */
const PLACEHOLDER_TITLE_PATTERN =
  /^(?:wip|tbd|temp(?:orary)?|misc|minor|nit|draft|chore|patch|test|cleanup|update[s]?|fix(?:es)?|임시|기타)$/i;

/** Shortest run of prose taken as a real intent statement rather than noise. */
const MIN_INTENT_LENGTH = 8;

/** `ENG-42` → `linear:ENG-42`; an already-qualified ref is left as it is. */
function toIssueRef(key: string): string {
  return key.includes(':') ? key : `linear:${key.toUpperCase()}`;
}

function firstParagraph(text: string): string | undefined {
  const paragraph = text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.length > 0);
  return paragraph === undefined ? undefined : paragraph.replace(/\s+/g, ' ');
}

/** Body prose with template scaffolding removed, so "빈 설명" is detected as such. */
function bodyProse(body: string): string | undefined {
  const stripped = body
    .replace(HTML_COMMENT_PATTERN, '')
    .replace(CHECKLIST_LINE_PATTERN, '')
    .replace(HEADING_LINE_PATTERN, '')
    .trim();
  const paragraph = firstParagraph(stripped);
  return paragraph !== undefined && paragraph.length >= MIN_INTENT_LENGTH ? paragraph : undefined;
}

/** The title minus its conventional prefix, when what remains actually says something. */
function descriptiveTitle(title: string): string | undefined {
  const stated = title.replace(CONVENTIONAL_PREFIX_PATTERN, '').trim();
  if (stated.length === 0 || PLACEHOLDER_TITLE_PATTERN.test(stated)) {
    return undefined;
  }
  return stated.split(/\s+/).length >= 2 ? stated : undefined;
}

function collectIntent(pr: RawPullRequest): Intent {
  const section = INTENT_SECTION_PATTERN.exec(pr.body)?.[1];
  const sectionText = section === undefined ? undefined : bodyProse(section);
  const issueTitle = pr.contextSignals?.issues?.find((issue) => issue.title)?.title;
  const commitText = pr.contextSignals?.commitMessages
    ?.map((message) => message.trim())
    .find((message) => message.length >= MIN_INTENT_LENGTH);

  // Richest available signal first: an explicit section, then free prose, then
  // the linked issue, then the title, then commit messages.
  const text =
    sectionText ?? bodyProse(pr.body) ?? issueTitle ?? descriptiveTitle(pr.title) ?? commitText;

  // AC2-1: nothing conclusive → "의도 불명확", handed to PRD-6 gap detection
  // rather than raised as an error.
  return text === undefined ? { confirmed: false } : { text, confirmed: true };
}

function issueKeysIn(pr: RawPullRequest): string[] {
  const keys: string[] = [];
  const push = (key: string): void => {
    const normalized = key.toUpperCase();
    if (!keys.includes(normalized)) {
      keys.push(normalized);
    }
  };
  for (const match of pr.body.matchAll(LINEAR_URL_PATTERN)) {
    push(match[1] ?? '');
  }
  for (const match of pr.body.matchAll(ISSUE_MENTION_PATTERN)) {
    push(match[1] ?? '');
  }
  for (const match of (pr.headRef ?? '').matchAll(BRANCH_ISSUE_PATTERN)) {
    push(match[1] ?? '');
  }
  return keys.filter((key) => key.length > 0);
}

function linkIssues(pr: RawPullRequest): IssueLink[] {
  const resolved = pr.contextSignals?.issues ?? [];
  const byRef = new Map(resolved.map((issue) => [toIssueRef(issue.ref), issue]));

  const refs = issueKeysIn(pr).map(toIssueRef);
  for (const ref of byRef.keys()) {
    // Issues the adapter resolved without an in-text reference still count.
    if (!refs.includes(ref)) {
      refs.push(ref);
    }
  }

  // AC2-2/AC2-6: no reference anywhere → `[]`, the explicit "관련 이슈 없음".
  return refs.map((ref) => {
    const details = byRef.get(ref);
    return {
      ref,
      ...(details?.title === undefined ? {} : { title: details.title }),
      ...(details?.dueDate === undefined ? {} : { dueDate: details.dueDate }),
    };
  });
}

function linkThreads(pr: RawPullRequest): ThreadLink[] {
  const resolved = pr.contextSignals?.threads ?? [];
  const byRef = new Map(resolved.map((thread) => [thread.ref, thread]));

  const refs: string[] = [];
  for (const match of pr.body.matchAll(SLACK_THREAD_PATTERN)) {
    if (!refs.includes(match[0])) {
      refs.push(match[0]);
    }
  }
  for (const ref of byRef.keys()) {
    if (!refs.includes(ref)) {
      refs.push(ref);
    }
  }

  // AC2-3/AC2-6: no link anywhere → `[]`, the explicit "관련 스레드 없음".
  return refs.map((ref) => {
    const summary = byRef.get(ref)?.summary;
    return { ref, ...(summary === undefined ? {} : { summary }) };
  });
}

function measureChangeSize(pr: RawPullRequest): ChangeSize {
  // AC2-4: LOC is carried through as numbers so PRD-4 tolerance and review
  // depth can key off it.
  return { additions: pr.additions, deletions: pr.deletions };
}

function collectSchedule(pr: RawPullRequest): ScheduleContext | undefined {
  const candidates: { deadline: string; note: string }[] = [];
  for (const issue of linkIssues(pr)) {
    if (issue.dueDate !== undefined) {
      candidates.push({ deadline: issue.dueDate, note: `연결 이슈 ${issue.ref}의 마감일` });
    }
  }
  if (pr.contextSignals?.releaseDate !== undefined) {
    candidates.push({ deadline: pr.contextSignals.releaseDate, note: '릴리스 일정' });
  }
  if (candidates.length === 0) {
    // AC2-5: no schedule signal at all — absent, not an empty-string deadline.
    return undefined;
  }
  // The tightest deadline is the one that shapes tolerance, so it wins.
  const sorted = [...candidates].sort((a, b) => a.deadline.localeCompare(b.deadline));
  return sorted[0];
}

function collect(pr: RawPullRequest): Context {
  const schedule = collectSchedule(pr);
  // AC2-6: every optional item degrades to an explicit absence, so composing a
  // context never throws and the review runs to completion.
  return {
    intent: collectIntent(pr),
    relatedIssues: linkIssues(pr),
    relatedThreads: linkThreads(pr),
    changeSize: measureChangeSize(pr),
    ...(schedule === undefined ? {} : { schedule }),
  };
}

export const contextModule: ContextModule = {
  collectIntent,
  linkIssues,
  linkThreads,
  measureChangeSize,
  collectSchedule,
  collect,
};
