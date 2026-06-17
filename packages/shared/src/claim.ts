import type { ClaimId, ConclusionId, EvidenceId, PerspectiveId } from './ids.js';

/**
 * Claims and the conclusion (PRD-5). The logic engine records reasoning as
 * claims (each attributed to perspectives and backed by an evidence set) linked
 * into a chain that terminates in a conclusion. The separation is what makes
 * the review debuggable (V1) and gap-detectable (V5).
 */

/** A single reasoning step. */
export interface Claim {
  id: ClaimId;
  statement: string;
  /** Perspectives this claim is attributed to — at least one (AC5-3, AC3-4). */
  perspectiveIds: PerspectiveId[];
  /** Supporting evidence set, stored by reference (AC5-2). */
  evidenceIds: EvidenceId[];
  /** Preceding claims this one depends on, forming the logic chain (AC5-4). */
  dependsOn: ClaimId[];
}

/** Verdict flavors. Conditional verdicts hinge on unresolved gaps. */
export type Verdict = 'trust' | 'conditional-trust' | 'distrust';

/**
 * The review's conclusion. Never stands alone: it must be supported by one or
 * more claims (AC5-1).
 */
export interface Conclusion {
  id: ConclusionId;
  verdict: Verdict;
  statement: string;
  supportingClaimIds: ClaimId[];
}
