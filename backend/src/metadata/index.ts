import type { AuthorIdentity, Metadata, PullRequestRef, RepositoryIdentity, WorkType } from '@lens/shared';
import type { RawPullRequest } from '../adapters/github/index.js';
import { notImplemented } from '../internal/not-implemented.js';

/**
 * PRD-1 · PR 메타데이터 추출.
 *
 * Pipeline stage 1 (input). Turns a raw PR into the metadata triple and
 * normalizes each value into a knowledge-base lookup key.
 */
export interface MetadataModule {
  /** AC1-1: classify into the owner-defined work-type set; "미분류" when unclear. */
  classifyWorkType(pr: RawPullRequest): WorkType[];

  /** AC1-2: identify the author; for bot PRs, infer the real human with basis. */
  identifyAuthor(pr: RawPullRequest): AuthorIdentity;

  /** AC1-3: identify the repository. */
  identifyRepository(ref: PullRequestRef): RepositoryIdentity;

  /** AC1-1..AC1-4: compose the full metadata, with keys normalized for the KB. */
  extract(pr: RawPullRequest): Metadata;
}

export const metadataModule: MetadataModule = {
  classifyWorkType: () => notImplemented('AC1-1'),
  identifyAuthor: () => notImplemented('AC1-2'),
  identifyRepository: () => notImplemented('AC1-3'),
  extract: () => notImplemented('AC1-4'),
};
