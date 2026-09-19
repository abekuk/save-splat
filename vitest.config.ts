import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: { alias: { '@': resolve(import.meta.dirname, 'src') } },
  test: {
    // the suite covers src/core, which is free of the DOM by design
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
