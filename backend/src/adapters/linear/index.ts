import type { ExternalRef, IssueLink } from '@lens/shared';
import { notImplemented } from '../../internal/not-implemented.js';

/**
 * Linear adapter (boundary stub). Resolves related issues for context
 * collection (PRD-2, AC2-2). Optional: absence of Linear links must never block
 * a review, so callers treat a missing issue as an explicit "없음".
 *
 * Read-only: Lens observes issues, it does not mutate them.
 */
export interface LinearAdapter {
  resolveIssue(ref: ExternalRef): Promise<IssueLink>;
}

/** TODO(impl): back this with the Linear API. */
export const linearAdapter: LinearAdapter = {
  resolveIssue: () => notImplemented('adapter:linear.resolveIssue'),
};
