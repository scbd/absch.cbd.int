import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: [
      // RequireJS module fetched from the API at boot (see app/boot.js);
      // tests resolve it to a static fixture instead.
      { find: 'realmConf', replacement: path.resolve(import.meta.dirname, 'test/services/__fixtures__/realm-configurations.ts') },
      { find: /^~\//, replacement: `${path.resolve(import.meta.dirname, 'app')}/` }
    ]
  },
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts']
  }
})
