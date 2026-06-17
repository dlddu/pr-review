import type { ButtonHTMLAttributes } from 'react';

/** C-btn — 버튼(주/보조). Placeholder. */
export type ButtonVariant = 'primary' | 'ghost' | 'quiet';

export interface CBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function CBtn({ variant, className, children, ...rest }: CBtnProps) {
  const composed = ['btn', variant && `btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button className={composed} data-component="C-btn" {...rest}>
      {children}
    </button>
  );
}
