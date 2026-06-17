import type { ReactNode } from 'react';

/** C-diff — 재리뷰 before/after 비교. Placeholder. */
export interface CDiffProps {
  children?: ReactNode;
}

export function CDiff({ children }: CDiffProps) {
  return (
    <div className="diff" data-component="C-diff">
      {children}
    </div>
  );
}
