import type { KnowledgeEntry, KnowledgeGapNotice, KnowledgeKey, KnowledgeSlice } from '@lens/shared';
import { notImplemented } from '../internal/not-implemented.js';

/**
 * PRD-4 · 메타데이터 지식 베이스.
 *
 * Accumulates knowledge keyed by metadata slice (work type / author /
 * repository) and surfaces augmentation prompts for thin slices (AC4-4). The
 * knowledge returned by {@link KnowledgeBaseModule.lookup} is the calibration
 * material the logic engine consumes (AC4-5).
 */
export interface KnowledgeBaseModule {
  /** AC4-1..AC4-3: accumulate a fact under a slice key. */
  recordEntry(key: KnowledgeKey, note: string): KnowledgeEntry;

  /** AC4-1..AC4-3, AC4-5: query a slice; its output feeds the engine. */
  lookup(key: KnowledgeKey): KnowledgeSlice;

  /** AC4-4: flag slices below the data threshold with an augmentation invitation. */
  detectThinSlices(keys: KnowledgeKey[]): KnowledgeGapNotice[];
}

export const knowledgeBaseModule: KnowledgeBaseModule = {
  recordEntry: () => notImplemented('AC4-1'),
  lookup: () => notImplemented('AC4-5'),
  detectThinSlices: () => notImplemented('AC4-4'),
};
