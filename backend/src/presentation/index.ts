import type { ClaimId, CognitiveStep, Review, ReviewPresentation } from '@lens/shared';
import { notImplemented } from '../internal/not-implemented.js';

/** A resolved drill-down target — where a cross-step reference leads (AC7-4). */
export interface DrilldownTarget {
  step: CognitiveStep;
  /** The claim/gap/suggestion the reference resolves to. */
  ref: string;
}

/**
 * PRD-7 · 리뷰 결과 표현 (인지 순서).
 *
 * Pipeline stage 5 (output). Renders the review in the fixed cognitive order —
 * summary → conclusion → logic → perspectives·evidence → gaps → rereview/close —
 * with progressive disclosure so the user descends only as deep as needed (V2).
 */
export interface PresentationModule {
  /** AC7-1/AC7-3: build sections in the fixed order, summary first. */
  present(review: Review): ReviewPresentation;

  /** AC7-2: toggle a section's expansion (progressive disclosure). */
  toggle(presentation: ReviewPresentation, step: CognitiveStep): ReviewPresentation;

  /** AC7-4: resolve a drill-down from a claim to its perspectives/evidence. */
  drilldownFromClaim(review: Review, claimId: ClaimId): DrilldownTarget;
}

export const presentationModule: PresentationModule = {
  present: () => notImplemented('AC7-1'),
  toggle: () => notImplemented('AC7-2'),
  drilldownFromClaim: () => notImplemented('AC7-4'),
};
