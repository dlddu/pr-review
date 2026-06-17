import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';

/** Smoke: every route renders its placeholder heading without crashing. */
const ROUTES = ['/', '/review', '/calibration', '/gap-fill', '/knowledge'] as const;

describe('App routes (smoke)', () => {
  for (const path of ROUTES) {
    it(`renders ${path}`, () => {
      const { container, unmount } = render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      );
      expect(container.querySelector('h1')).not.toBeNull();
      // The appbar nav is always present.
      expect(container.querySelector('.appbar')).not.toBeNull();
      unmount();
    });
  }
});
