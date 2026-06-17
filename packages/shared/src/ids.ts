/**
 * Identifier aliases for the Lens domain.
 *
 * These are plain `string` aliases for now. They exist so signatures read
 * intentionally (an `EvidenceId` is not interchangeable with a `ClaimId` to a
 * human reader) and so a future hardening step can swap in branded types
 * without touching call sites.
 *
 * TODO(impl): consider branded types (e.g. `string & { readonly __claim: unique symbol }`).
 */
export type ReviewId = string;
export type ClaimId = string;
export type EvidenceId = string;
export type PerspectiveId = string;
export type ConclusionId = string;
export type GapId = string;
export type KnowledgeId = string;

/** Issue/thread/PR references from external systems (GitHub, Linear, Slack). */
export type ExternalRef = string;
