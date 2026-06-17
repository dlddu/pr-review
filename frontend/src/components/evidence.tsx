import type { Evidence } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-evidence — 근거 항목(주장과 시각 분리). Placeholder. */
export interface CEvidenceProps {
  evidence?: Evidence;
  children?: ReactNode;
}

export function CEvidence({ children }: CEvidenceProps) {
  return (
    <div className="evidence" data-component="C-evidence">
      {children}
    </div>
  );
}
