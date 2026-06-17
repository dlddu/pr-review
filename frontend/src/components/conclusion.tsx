import type { Conclusion } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-conclusion — 결론 블록(신뢰/조건부 신뢰 등). Placeholder. */
export interface CConclusionProps {
  conclusion?: Conclusion;
  children?: ReactNode;
}

export function CConclusion({ children }: CConclusionProps) {
  return (
    <div className="verdict" data-component="C-conclusion">
      {children}
    </div>
  );
}
