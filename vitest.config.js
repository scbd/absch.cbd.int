import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'app')
    }
  },
  test: {
    setupFiles: ['./test/setup.ts'],
    server: {
      // @scbd/angular-vue ships extensionless relative imports that only
      // resolve when run through Vite's transform, not Node's native ESM loader.
      deps: { inline: [/@scbd\/angular-vue/] }
    }
  }
});
