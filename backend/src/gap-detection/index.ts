import type { ClosureReason, Gap, Review, Suggestion } from '@lens/shared';
import { notImplemented } from '../internal/not-implemented.js';

/* =============================================================================
 * AC6-5 — CODEBASE-MUTATION BOUNDARY (INVARIANT — DO NOT WEAKEN)
 * -----------------------------------------------------------------------------
 * Lens is a judgment aid. It never merges, approves, pushes, or otherwise
 * changes the codebase. Closing or re-reviewing affects review state only,
 * never PR state.
 *
 * This boundary is enforced two ways and guarded by a reserved regression test
 * (`gap-detection.test.ts`, AC6-5):
 *   1. By construction — `ReviewAction` admits only review-only actions, so
 *      "merge"/"approve"/"push" cannot even be named at a call site.
 *   2. At runtime — `assertReviewOnly` rejects anything outside that set.
 *
 * Any future feature that adds an action MUST keep this list review-only.
 * ========================================================================== */

/** Whether Lens is permitted to mutate the codebase. Always false (AC6-5). */
export const CODEBASE_MUTATION_PERMITTED = false as const;

/** The only actions Lens may take — both confined to review state (AC6-4, AC6-5). */
export type ReviewAction = 'rereview' | 'close';

/** The frozen allow-list of review-only actions. Excludes merge/approve/push. */
export const ALLOWED_REVIEW_ACTIONS: readonly ReviewAction[] = ['rereview', 'close'] as const;

/**
 * Guard the AC6-5 invariant at runtime. The `ReviewAction` type already forbids
 * codebase-mutating actions by construction; this is the explicit seam the
 * regression test exercises and the place any new action is validated.
 */
export function assertReviewOnly(action: ReviewAction): void {
  if (!ALLOWED_REVIEW_ACTIONS.includes(action)) {
    throw new Error(
      `AC6-5 violation: '${action}' would change the codebase; Lens is review-only.`,
    );
  }
}

/**
 * PRD-6 · 논리 공백 탐지 및 보완.
 *
 * Pipeline stage 4. Finds leaps/holes in the logic chain, proposes concrete
 * completions, and re-reviews or closes — all within the AC6-5 boundary above.
 */
export interface GapDetectionModule {
  /** AC6-1: detect unsupported claims, leaped conclusions, missing context. */
  detect(review: Review): Gap[];

  /** AC6-2: produce ≥1 actionable suggestion (action|information|perspective) per gap. */
  suggestFor(gap: Gap): Suggestion[];

  /** AC6-3: re-run the engine after completion (review-only — see boundary). */
  rereview(review: Review): Review;

  /** AC6-4: record closure with reason (no-gaps | user-accepted); review state only. */
  close(review: Review, reason: ClosureReason): Review;
}

export const gapDetectionModule: GapDetectionModule = {
  detect: () => notImplemented('AC6-1'),
  suggestFor: () => notImplemented('AC6-2'),
  rereview: () => notImplemented('AC6-3'),
  close: () => notImplemented('AC6-4'),
};
