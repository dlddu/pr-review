import type { EvidenceId } from './ids.js';

/**
 * Evidence (PRD-5). A unit of support, stored separately from the claim it
 * backs so it can be queried and revised independently (AC5-2).
 */
export interface Evidence {
  id: EvidenceId;
  statement: string;
  /** Provenance — where this evidence came from (diff hunk, issue, thread, …). */
  source?: string;
}
