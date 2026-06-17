import type { Perspective } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-perspective-tag — 주장의 관점 귀속 태그. Placeholder. */
export interface CPerspectiveTagProps {
  perspective?: Perspective;
  children?: ReactNode;
}

export function CPerspectiveTag({ children }: CPerspectiveTagProps) {
  return (
    <span className="ptag" data-component="C-perspective-tag">
      {children}
    </span>
  );
}
