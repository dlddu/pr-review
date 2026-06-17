import type {
  ChangeSize,
  Context,
  Intent,
  IssueLink,
  PullRequestRef,
  ScheduleContext,
  ThreadLink,
} from '@lens/shared';
import { notImplemented } from '../internal/not-implemented.js';

/**
 * PRD-2 · 리뷰 컨텍스트 수집.
 *
 * Pipeline stage 1 (input). Gathers intent, related issues/threads, change
 * size, and schedule. Optional items resolve to explicit "없음" so their
 * absence never blocks the review (AC2-6).
 */
export interface ContextModule {
  /** AC2-1: derive PR intent; unconfirmed → "의도 불명확" (a gap target). */
  collectIntent(ref: PullRequestRef): Intent;

  /** AC2-2: link related issues (optional, primarily Linear). */
  linkIssues(ref: PullRequestRef): IssueLink[];

  /** AC2-3: link related threads (optional, primarily Slack). */
  linkThreads(ref: PullRequestRef): ThreadLink[];

  /** AC2-4: measure change size in LOC. */
  measureChangeSize(ref: PullRequestRef): ChangeSize;

  /** AC2-5: collect schedule/deadline context; absent when none. */
  collectSchedule(ref: PullRequestRef): ScheduleContext | undefined;

  /** AC2-1..AC2-6: compose the full context, absence handled explicitly. */
  collect(ref: PullRequestRef): Context;
}

export const contextModule: ContextModule = {
  collectIntent: () => notImplemented('AC2-1'),
  linkIssues: () => notImplemented('AC2-2'),
  linkThreads: () => notImplemented('AC2-3'),
  measureChangeSize: () => notImplemented('AC2-4'),
  collectSchedule: () => notImplemented('AC2-5'),
  collect: () => notImplemented('AC2-6'),
};
