import type { CognitiveStep } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-section — 인지 순서 섹션(접힘/펼침). Placeholder. */
export interface CSectionProps {
  step?: CognitiveStep;
  /** 1-based ordinal in the fixed cognitive order. */
  order?: number;
  title?: string;
  children?: ReactNode;
}

export function CSection({ order, title, children }: CSectionProps) {
  return (
    <section className="layer" data-component="C-section">
      <div className="layer__head">
        {order !== undefined && <span className="layer__ord">{order}</span>}
        {title && <span className="layer__title">{title}</span>}
      </div>
      <div className="layer__body">{children}</div>
    </section>
  );
}
