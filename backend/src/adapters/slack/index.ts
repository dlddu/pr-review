import type { ExternalRef, ThreadLink } from '@lens/shared';
import { notImplemented } from '../../internal/not-implemented.js';

/**
 * Slack adapter (boundary stub). Resolves related discussion threads for
 * context collection (PRD-2, AC2-3). Optional: a missing thread is recorded as
 * an explicit "없음" and never blocks a review.
 *
 * Read-only: Lens reads threads for background, it does not post or mutate.
 */
export interface SlackAdapter {
  resolveThread(ref: ExternalRef): Promise<ThreadLink>;
}

/** TODO(impl): back this with the Slack API. */
export const slackAdapter: SlackAdapter = {
  resolveThread: () => notImplemented('adapter:slack.resolveThread'),
};
