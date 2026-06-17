/**
 * Presentation view model (PRD-7). The review is always presented in a fixed
 * cognitive order; the user descends only as deep as they need (V2). This type
 * encodes that order so the order can never be silently rearranged (AC7-1).
 */

/** The six cognitive-order steps, in their canonical sequence. */
export type CognitiveStep =
  | 'summary' //                1. PR 내용 요약 (AC7-3)
  | 'conclusion' //             2. 리뷰의 결론
  | 'logic' //                  3. 결론을 만든 논리
  | 'perspectives-evidence' //  4. 각 주장의 관점·근거
  | 'gaps' //                   5. 공백 보완 제안
  | 'rereview-or-close'; //     6. 재리뷰 또는 종결 (no code change — AC6-5)

/** The canonical order, frozen. Index + 1 is the display ordinal (1..6). */
export const COGNITIVE_ORDER: readonly CognitiveStep[] = [
  'summary',
  'conclusion',
  'logic',
  'perspectives-evidence',
  'gaps',
  'rereview-or-close',
] as const;

/** One renderable section, carrying its fixed ordinal and collapse state. */
export interface PresentationSection {
  step: CognitiveStep;
  /** 1-based ordinal matching `COGNITIVE_ORDER` (AC7-1). */
  order: number;
  /** Whether the section is expanded; supports progressive disclosure (AC7-2). */
  expanded: boolean;
}

/** The ordered set of sections for a review, ready to render top-to-bottom. */
export interface ReviewPresentation {
  sections: PresentationSection[];
}
