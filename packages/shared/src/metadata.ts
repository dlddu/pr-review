import type { ExternalRef } from './ids.js';

/**
 * PR metadata (PRD-1). The three review-shaping signals — work type, author,
 * repository — extracted from a PR and normalized into knowledge-base keys.
 */

/** Provider the PR originates from. Extensible; GitHub is the first adapter. */
export type Provider = 'github';

/** Stable handle for a single pull request across the pipeline. */
export interface PullRequestRef {
  provider: Provider;
  /** Repository identifier, e.g. `owner/name`. */
  repository: string;
  /** PR number within the repository. */
  number: number;
}

/**
 * User-defined work-type label (feature / bugfix / refactor / docs / …).
 * Not an enum: the set is owner-defined and grows over time (AC1-1).
 */
export type WorkType = string;

/** Sentinel for an unclassified work type — becomes a gap-detection target (AC1-1). */
export const UNCLASSIFIED_WORK_TYPE = '미분류' as const;

/**
 * The basis for inferring the real human behind a bot-authored PR (AC1-2):
 * commit author, trigger metadata, linked-issue assignee, etc.
 */
export interface AuthorInferenceBasis {
  kind: 'commit-author' | 'trigger-metadata' | 'linked-issue-assignee';
  detail: string;
}

/**
 * Resolved PR author. When the raw author is a bot, `inferredHuman` carries the
 * estimated real user plus the evidence for that estimate (AC1-2). When no human
 * can be inferred, `inferredHuman` is absent and the author is treated as a gap.
 */
export interface AuthorIdentity {
  /** Normalized knowledge-base key for this author (AC1-4). */
  key: string;
  displayName: string;
  isBot: boolean;
  inferredHuman?: {
    key: string;
    basis: AuthorInferenceBasis[];
  };
}

/** Repository identity, normalized to the knowledge-base repository key (AC1-3, AC1-4). */
export interface RepositoryIdentity {
  /** Normalized knowledge-base key for this repository. */
  key: string;
  ref: ExternalRef;
}

/** The full metadata triple attached to a review. */
export interface Metadata {
  /** One or more work types; empty + `unclassified` when undecidable (AC1-1). */
  workTypes: WorkType[];
  unclassified: boolean;
  author: AuthorIdentity;
  repository: RepositoryIdentity;
}
