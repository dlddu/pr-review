import type { KnowledgeId } from './ids.js';

/**
 * Metadata knowledge base (PRD-4). Knowledge accrues keyed by metadata slice —
 * work type, author, repository — and feeds calibration. Thin slices trigger a
 * data-augmentation suggestion (AC4-4).
 */

/** Which metadata dimension a knowledge slice is keyed by. */
export type KnowledgeKind = 'workType' | 'author' | 'repository';

/** A normalized lookup key into the knowledge base (AC1-4, AC4-1..4-3). */
export interface KnowledgeKey {
  kind: KnowledgeKind;
  /** Normalized value (e.g. a normalized author key, `owner/repo`, work-type label). */
  value: string;
}

/**
 * A single accumulated fact within a slice. The concrete shape per kind
 * (tolerance ranges for work types, trust/disposition for authors, conventions
 * for repos) is deferred to implementation.
 *
 * TODO(impl): refine into per-kind structured payloads.
 */
export interface KnowledgeEntry {
  id: KnowledgeId;
  note: string;
}

/** All knowledge accumulated under one key, plus the volume backing it. */
export interface KnowledgeSlice {
  key: KnowledgeKey;
  entries: KnowledgeEntry[];
  /** Volume of accumulated data; compared against a threshold for AC4-4. */
  dataPoints: number;
}

/**
 * Notice that a slice is too thin to review confidently, with an invitation to
 * add data (AC4-4). Distinct from a logic Gap: this is about KB coverage, not
 * about a hole in a specific review's reasoning.
 */
export interface KnowledgeGapNotice {
  key: KnowledgeKey;
  /** Actionable augmentation prompt shown to the user. */
  invitation: string;
}
