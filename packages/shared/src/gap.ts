import type { ClaimId, ConclusionId, GapId } from './ids.js';

/**
 * Logic gaps and completion suggestions (PRD-6). Gaps are surfaced as ochre
 * "invitations to complete", not red errors, and each carries at least one
 * actionable suggestion. The product never mutates the codebase (AC6-5).
 */

/** The kinds of holes detected in a logic chain (AC6-1). */
export type GapKind =
  /** (a) a claim with no supporting evidence. */
  | 'unsupported-claim'
  /** (b) a conclusion reached without preceding claims. */
  | 'leap-to-conclusion'
  /** (c) optional-but-necessary context that is absent. */
  | 'missing-context';

/** What is needed to close a gap (AC6-2). */
export type SuggestionCategory = 'action' | 'information' | 'perspective';

/** A concrete, executable completion proposal. */
export interface Suggestion {
  category: SuggestionCategory;
  /** Specific, actionable detail — not a vague gesture. */
  detail: string;
}

/** A detected gap, anchored to where it occurs, with completion suggestions. */
export interface Gap {
  id: GapId;
  kind: GapKind;
  /** Where the gap sits: the claim or conclusion it attaches to. */
  locationRef: ClaimId | ConclusionId;
  /** At least one suggestion per gap (AC6-2). */
  suggestions: Suggestion[];
}
