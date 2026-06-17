import type { ReactNode } from 'react';

/** C-callout — 부족 지식/경고/안내. Placeholder. */
export type CalloutVariant = 'gap' | 'info' | 'ok';

export interface CCalloutProps {
  variant?: CalloutVariant;
  children?: ReactNode;
}

export function CCallout({ variant, children }: CCalloutProps) {
  const className = variant ? `callout callout--${variant}` : 'callout';
  return (
    <div className={className} data-component="C-callout">
      {children}
    </div>
  );
}
