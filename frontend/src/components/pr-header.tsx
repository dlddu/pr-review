import type { Context, Metadata } from '@lens/shared';
import type { ReactNode } from 'react';

/** C-pr-header — PR 메타데이터 헤더(제목·작성자·저장소·LOC·일정). Placeholder. */
export interface CPrHeaderProps {
  metadata?: Metadata;
  context?: Context;
  children?: ReactNode;
}

export function CPrHeader({ children }: CPrHeaderProps) {
  return (
    <header className="pr-header" data-component="C-pr-header">
      {children}
    </header>
  );
}
