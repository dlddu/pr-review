import type { ReactNode } from 'react';

/** C-rail — 우측 보정 요약 레일. Placeholder. */
export interface CRailProps {
  children?: ReactNode;
}

export function CRail({ children }: CRailProps) {
  return (
    <aside className="rail" data-component="C-rail">
      {children}
    </aside>
  );
}
