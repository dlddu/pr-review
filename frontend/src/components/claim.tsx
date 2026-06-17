import type { Claim } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-claim — 주장 블록(고유 식별자 + 펼침). Placeholder. */
export interface CClaimProps {
  claim?: Claim;
  children?: ReactNode;
}

export function CClaim({ children }: CClaimProps) {
  return (
    <div className="claim" data-component="C-claim">
      {children}
    </div>
  );
}
