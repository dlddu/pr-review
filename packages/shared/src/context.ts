import type { ExternalRef } from './ids.js';

/**
 * Review context (PRD-2). Signals consulted during review: intent, related
 * issues/threads, change size, and schedule. Optional items are represented as
 * explicit "absent" states so their absence never blocks a review (AC2-6) and
 * gap detection can still reason about them.
 */

/** PR intent, the reference point for the whole review (AC2-1). */
export interface Intent {
  /** Inferred intent text; absent when it could not be confirmed. */
  text?: string;
  /** False → "의도 불명확", which becomes a gap-detection target. */
  confirmed: boolean;
}

/** A linked issue, primarily Linear (AC2-2, optional). */
export interface IssueLink {
  ref: ExternalRef;
  title?: string;
}

/** A linked discussion thread, primarily Slack (AC2-3, optional). */
export interface ThreadLink {
  ref: ExternalRef;
  summary?: string;
}

/** Change size in lines of code (AC2-4). */
export interface ChangeSize {
  additions: number;
  deletions: number;
}

/** Schedule / deadline context (AC2-5). */
export interface ScheduleContext {
  /** ISO-8601 deadline, if any (linked-issue due date, release date, …). */
  deadline?: string;
  note?: string;
}

/**
 * The collected context for a review. Optional collections default to empty
 * (an explicit "없음"); `schedule` is omitted when no schedule signal exists.
 */
export interface Context {
  intent: Intent;
  relatedIssues: IssueLink[];
  relatedThreads: ThreadLink[];
  changeSize: ChangeSize;
  schedule?: ScheduleContext;
}
