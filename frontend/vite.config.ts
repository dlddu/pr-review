import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Single config for both Vite (dev/build) and Vitest (smoke tests).
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
