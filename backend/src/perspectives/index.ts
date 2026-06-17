import type { ClaimId, Perspective, PerspectiveId, ReviewId } from '@lens/shared';
import { notImplemented } from '../internal/not-implemented.js';

/** Fields needed to create a perspective (AC3-1). */
export interface PerspectiveDraft {
  name: string;
  description: string;
  criteria: string;
}

/**
 * PRD-3 · 동적 평가 관점 관리.
 *
 * Perspectives are the source of claims in the logic engine and are tracked
 * bidirectionally (AC3-4). Retirement is a soft-delete that preserves past
 * reviews' debuggability (AC3-2).
 */
export interface PerspectivesModule {
  /** AC3-1: create a perspective (identifier, description, criteria). */
  create(draft: PerspectiveDraft): Perspective;

  /** AC3-2: retire a perspective — stop applying it, keep history intact. */
  retire(id: PerspectiveId): void;

  /** AC3-1/AC3-3: perspectives offered as candidates for a new review. */
  listActive(): Perspective[];

  /** AC3-3: apply selected perspectives to a specific review. */
  apply(reviewId: ReviewId, perspectiveIds: PerspectiveId[]): void;

  /** AC3-4 (forward): claims produced from a given perspective. */
  claimsFromPerspective(id: PerspectiveId): ClaimId[];

  /** AC3-4 (backward): perspectives a given claim is attributed to. */
  perspectivesOfClaim(id: ClaimId): PerspectiveId[];
}

export const perspectivesModule: PerspectivesModule = {
  create: () => notImplemented('AC3-1'),
  retire: () => notImplemented('AC3-2'),
  listActive: () => notImplemented('AC3-1'),
  apply: () => notImplemented('AC3-3'),
  claimsFromPerspective: () => notImplemented('AC3-4'),
  perspectivesOfClaim: () => notImplemented('AC3-4'),
};
