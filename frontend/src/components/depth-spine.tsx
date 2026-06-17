import type { ReactNode } from 'react';

/**
 * C-depth-spine — 🔶 시그니처. 좌측 깊이 척추: 인지 순서를 수직 레일의 번호 노드(1–6)로.
 * Placeholder — the active-depth fill animation is deferred.
 */
export interface CDepthSpineProps {
  /** Current expanded depth (1–6) the rail fills up to. */
  activeStep?: number;
  children?: ReactNode;
}

export function CDepthSpine({ activeStep, children }: CDepthSpineProps) {
  return (
    <div className="with-spine" data-component="C-depth-spine" data-active-step={activeStep}>
      {children}
    </div>
  );
}
