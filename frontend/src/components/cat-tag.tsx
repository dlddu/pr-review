import type { SuggestionCategory } from '@lens/shared';
import type { ReactNode } from 'react';

/** Maps a domain suggestion category to its design-token css suffix. */
const CAT_CLASS: Record<SuggestionCategory, string> = {
  action: 'cat--action',
  information: 'cat--info',
  perspective: 'cat--view',
};

/** C-cat-tag — 공백 분류 태그(행위/정보/관점). Placeholder. */
export interface CCatTagProps {
  category?: SuggestionCategory;
  children?: ReactNode;
}

export function CCatTag({ category, children }: CCatTagProps) {
  const className = category ? `cat ${CAT_CLASS[category]}` : 'cat';
  return (
    <span className={className} data-component="C-cat-tag">
      {children}
    </span>
  );
}
