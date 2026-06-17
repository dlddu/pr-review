import type { Claim, Conclusion } from './claim.js';
import type { Context } from './context.js';
import type { Evidence } from './evidence.js';
import type { Gap } from './gap.js';
import type { PerspectiveId, ReviewId } from './ids.js';
import type { Metadata } from './metadata.js';
import type { PullRequestRef } from './metadata.js';

/**
 * The review aggregate — the end-to-end artifact the pipeline produces and the
 * UI renders. Ties together metadata (PRD-1), context (PRD-2), applied
 * perspectives (PRD-3), the claim/evidence/conclusion graph (PRD-5), and the
 * detected gaps (PRD-6).
 */

/** Lifecycle status. Closure affects only the review, never the PR (AC6-4, AC6-5). */
export type ReviewStatus = 'draft' | 'open' | 'closed';

/** Why a review was closed (AC6-4). */
export type ClosureReason =
  /** No gaps remained. */
  | 'no-gaps'
  /** Gaps remained but the user accepted them and chose to close. */
  | 'user-accepted';

export interface Closure {
  reason: ClosureReason;
  /** ISO-8601 timestamp of closure. */
  at: string;
}

export interface Review {
  id: ReviewId;
  pr: PullRequestRef;
  metadata: Metadata;
  context: Context;
  /** Perspectives actually applied to this review (AC3-3). */
  appliedPerspectiveIds: PerspectiveId[];
  claims: Claim[];
  evidence: Evidence[];
  conclusion: Conclusion;
  gaps: Gap[];
  status: ReviewStatus;
  /** Present only once the review is closed. */
  closure?: Closure;
}
