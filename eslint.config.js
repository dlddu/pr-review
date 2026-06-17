// Flat ESLint config shared by every workspace package.
// Type-aware linting is intentionally left off to keep the toolchain lean —
// `tsc --noEmit` (the `typecheck` script) carries type correctness.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/*.timestamp-*'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // TypeScript resolves identifiers; the core rule only yields false positives here.
      'no-undef': 'off',
      // Stub signatures keep descriptive names; `_`-prefixed args/vars are intentional placeholders.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
