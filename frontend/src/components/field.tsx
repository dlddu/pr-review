import type { ReactNode } from 'react';

/** C-field — 지식/관점 입력 필드. Placeholder. */
export interface CFieldProps {
  label?: string;
  hint?: string;
  children?: ReactNode;
}

export function CField({ label, hint, children }: CFieldProps) {
  return (
    <div className="field" data-component="C-field">
      {label && <label className="field__label">{label}</label>}
      {hint && <p className="field__hint">{hint}</p>}
      {children}
    </div>
  );
}
