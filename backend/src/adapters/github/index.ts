import type { PullRequestRef } from '@lens/shared';
import { notImplemented } from '../../internal/not-implemented.js';

/**
 * GitHub adapter (boundary stub). Source of PRs, diffs, authors, and LOC — the
 * raw material for metadata (PRD-1) and context (PRD-2). This is the *only*
 * place GitHub specifics should leak in; the pipeline depends on this interface,
 * not on GitHub.
 *
 * Read-only by design: Lens never merges, approves, or pushes (AC6-5). No
 * mutating method is exposed here, and none should be added.
 */

/** A fetched pull request in its raw, provider-shaped form. */
export interface RawPullRequest {
  ref: PullRequestRef;
  title: string;
  body: string;
  authorLogin: string;
  isBot: boolean;
  additions: number;
  deletions: number;
}

export interface GithubAdapter {
  fetchPullRequest(ref: PullRequestRef): Promise<RawPullRequest>;
  fetchDiff(ref: PullRequestRef): Promise<string>;
}

/** TODO(impl): back this with the GitHub API. */
export const githubAdapter: GithubAdapter = {
  fetchPullRequest: () => notImplemented('adapter:github.fetchPullRequest'),
  fetchDiff: () => notImplemented('adapter:github.fetchDiff'),
};
