import type { ReactNode } from 'react';

/** C-action-bar — 재리뷰/종결 액션 영역. Placeholder. */
export interface CActionBarProps {
  children?: ReactNode;
}

export function CActionBar({ children }: CActionBarProps) {
  return (
    <div className="actionbar" data-component="C-action-bar">
      {children}
    </div>
  );
}
