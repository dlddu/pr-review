import type { Gap } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-gap-card — 공백 카드(오커색, 보완 제안으로 이어짐). Placeholder. */
export interface CGapCardProps {
  gap?: Gap;
  children?: ReactNode;
}

export function CGapCard({ children }: CGapCardProps) {
  return (
    <div className="gap" data-component="C-gap-card">
      {children}
    </div>
  );
}
