import type { ReactNode } from 'react';

/** C-appbar — 상단 바(브랜드 + 화면 네비 + PR 칩). Placeholder. */
export interface CAppbarProps {
  children?: ReactNode;
}

export function CAppbar({ children }: CAppbarProps) {
  return (
    <header className="appbar" data-component="C-appbar">
      {children}
    </header>
  );
}
