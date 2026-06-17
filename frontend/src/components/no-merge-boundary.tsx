import type { ReactNode } from 'react';

/**
 * C-no-merge-boundary — 🔶 머지 금지 명시 경계 라인.
 * Visualizes AC6-5: "코드베이스를 바꾸지 않는다". Placeholder.
 */
export interface CNoMergeBoundaryProps {
  children?: ReactNode;
}

export function CNoMergeBoundary({ children }: CNoMergeBoundaryProps) {
  return (
    <p className="boundary" data-component="C-no-merge-boundary">
      <span className="boundary__glyph" aria-hidden="true">
        ⊘
      </span>
      {children ?? 'Lens는 머지·승인·푸시 등 코드베이스 변경을 수행하지 않습니다.'}
    </p>
  );
}
