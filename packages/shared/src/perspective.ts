import type { PerspectiveId } from './ids.js';

/**
 * Evaluation perspective (PRD-3). The lens through which the logic engine
 * forms claims. Perspectives are created/retired dynamically and applied
 * selectively per review.
 */
export interface Perspective {
  id: PerspectiveId;
  /** Short human-facing name/identifier. */
  name: string;
  description: string;
  /** What this perspective looks at — its evaluation criteria (AC3-1). */
  criteria: string;
  /**
   * Soft-delete (AC3-2): a retired perspective is no longer offered to new
   * reviews, but past reviews that referenced it remain debuggable. Retirement
   * is "stop applying", never a retroactive purge.
   */
  retired: boolean;
}
