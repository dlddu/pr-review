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
  /**
   * Raw signals for inferring the human behind a bot-authored PR (AC1-2).
   * Optional and read-only: when absent (or empty) the author is "추정 불가" and
   * becomes a gap-detection target. Populating these from the GitHub API is
   * deferred to the adapter impl; keeping them here (not a mutating method)
   * preserves the AC6-5 read-only boundary.
   */
  inferenceSignals?: {
    /** Commit author logins on the PR — the highest-priority inference signal. */
    commitAuthors?: string[];
    /** User recorded as having triggered the bot (e.g. the workflow actor). */
    triggeredBy?: string;
    /** Assignee of an issue linked from the PR. */
    linkedIssueAssignee?: string;
  };
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
