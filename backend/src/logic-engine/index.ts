import type {
  Claim,
  ClaimId,
  Conclusion,
  Context,
  Evidence,
  KnowledgeSlice,
  Metadata,
  Perspective,
} from '@lens/shared';
import { notImplemented } from '../internal/not-implemented.js';

/** Everything the engine needs to reason about a PR. */
export interface ReviewInput {
  metadata: Metadata;
  context: Context;
  appliedPerspectives: Perspective[];
  /** Calibration material from the knowledge base (AC4-5). */
  knowledge: KnowledgeSlice[];
}

/** The engine's output: the claim/evidence graph and the conclusion it supports. */
export interface ReviewLogic {
  claims: Claim[];
  evidence: Evidence[];
  conclusion: Conclusion;
}

/** A single reasoning step in isolation — one claim with just its evidence (AC5-5). */
export interface ClaimStepView {
  claim: Claim;
  evidence: Evidence[];
}

/**
 * PRD-5 · 리뷰 논리 엔진.
 *
 * Pipeline stage 3. Derives the conclusion from applied perspectives, context,
 * and knowledge, recording each step as separated claims and evidence so the
 * result is both debuggable (V1) and gap-detectable (V5).
 */
export interface LogicEngineModule {
  /** AC5-1..AC5-4: run the engine — produce claims, evidence, and a supported conclusion. */
  run(input: ReviewInput): ReviewLogic;

  /** AC5-1: every conclusion is backed by ≥1 claim (no "bare" conclusions). */
  deriveConclusion(logic: Pick<ReviewLogic, 'claims'>): Conclusion;

  /** AC5-4: assemble claims into a dependency chain ending at the conclusion. */
  buildChain(claims: Claim[]): Claim[];

  /** AC5-5: expand exactly one step (claim + its evidence) for low-load debugging. */
  stepView(logic: ReviewLogic, claimId: ClaimId): ClaimStepView;
}

export const logicEngineModule: LogicEngineModule = {
  run: () => notImplemented('AC5-2'),
  deriveConclusion: () => notImplemented('AC5-1'),
  buildChain: () => notImplemented('AC5-4'),
  stepView: () => notImplemented('AC5-5'),
};
