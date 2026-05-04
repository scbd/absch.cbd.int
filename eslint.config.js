import globals from 'globals'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores, defineConfig } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import eslintMinimalFilesList from './.config/eslintminimal.json' with { type: 'json' }
import standard from 'neostandard' // Standard for ESLint
import love from 'eslint-config-love' // Standard for TypeScript

const standardStyles = standard({ ts: true, filesTs: ['**/*.{ts,mts,tsx,vue,js}'] })
  .find((config) => config.name === 'neostandard/style') || {}

// Discrepancies between ESLint standard library and JSStandard package.
standardStyles.rules['@stylistic/type-annotation-spacing'] = ['error', { before: false, after: true }]
love.rules['@typescript-eslint/no-magic-numbers'] = ['error', { ignoreArrayIndexes: true, ignore: [0, 1] }]

const vueTs = defineConfigWithVueTs([
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    rules: {
      ...love.rules,
      'no-useless-assignment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off'
    },
    plugins: love.plugins,
    files: ['**/*.vue']
  }
])

export default defineConfig([
  globalIgnores(['.config/', 'dist/', 'node_modules/', 'app/views/pdf-viewer/pdfjs/']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        angular: 'readonly',
        $: 'readonly',
        jQuery: 'readonly',
        moment: 'readonly',
        _: 'readonly',
        L: 'readonly',
        Chart: 'readonly',
        AmCharts: 'readonly',
        Trix: 'readonly',
        YT: 'readonly'
      }
    },
    rules: {
      'import-x/no-webpack-loader-syntax': 'off'
    }
  },
  ...standard({
    files: ['**/*.{ts,mts,tsx,vue,js}'],
    noStyle: true
  }),
  {
    name: 'include styles for new files',
    files: ['**/*.{ts,mts,tsx,vue,js}'],
    rules: standardStyles.rules,
    plugins: standardStyles.plugins,
    ignores: eslintMinimalFilesList // Only highlight critical errors for old files to avoid every line showing an error.
  },
  vueTs,
  {
    ...love,
    files: ['**/*.{ts, js}']
  },
  {
    settings: {
      'vue-i18n': {
        localeDir: './app/app-text/*.{json,json5,yaml,yml}'
      }
    }
  },
  {
    // Legacy JS files: disable/downgrade rules inappropriate for old AngularJS code
    files: ['**/*.js'],
    rules: {
      'import-x/no-webpack-loader-syntax': 'off',
      eqeqeq: 'warn',
      camelcase: 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'new-cap': 'off'
    }
  }
])
