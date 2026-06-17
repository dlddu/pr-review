import type { ReactNode } from 'react';

/** C-kv — 키-값 목록(메타데이터/컨텍스트, "없음" 명시 포함). Placeholder. */
export interface CKvProps {
  children?: ReactNode;
}

export function CKv({ children }: CKvProps) {
  return (
    <dl className="kv" data-component="C-kv">
      {children}
    </dl>
  );
}
