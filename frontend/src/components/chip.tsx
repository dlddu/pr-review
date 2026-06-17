import type { ReactNode } from 'react';

/** C-chip — 작업유형/저장소/상태 칩. Placeholder. */
export type ChipVariant = 'accent' | 'ok' | 'gap' | 'ghost';

export interface CChipProps {
  variant?: ChipVariant;
  children?: ReactNode;
}

export function CChip({ variant, children }: CChipProps) {
  const className = variant ? `chip chip--${variant}` : 'chip';
  return (
    <span className={className} data-component="C-chip">
      {children}
    </span>
  );
}
