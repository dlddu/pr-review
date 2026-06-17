/**
 * @lens/shared — the single source of truth for the Lens domain model.
 *
 * These types describe the review/claim shapes the backend produces and the
 * frontend renders. Logic lives in the backend; this package is types (plus a
 * few frozen constants) only.
 */
export * from './ids.js';
export * from './metadata.js';
export * from './context.js';
export * from './perspective.js';
export * from './knowledge.js';
export * from './evidence.js';
export * from './claim.js';
export * from './gap.js';
export * from './review.js';
export * from './presentation.js';
