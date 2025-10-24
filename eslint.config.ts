import globals from "globals";
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import eslintMinimalFilesList from './.config/eslintminimal.json'
import standard from 'eslint-config-standard'
import problems from 'eslint-config-problems'

export default defineConfigWithVueTs(
  globalIgnores(['.config/', 'dist/', 'node_modules/']),
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    name: 'pre-linter files (minimal linter rules)',
    files: eslintMinimalFilesList,
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error'
    },
    rules: {
      ...problems.rules,
      'no-var': standard.rules['no-var'],
      'object-shorthand': standard.rules['object-shorthand'],
      'accessor-pairs': standard.rules['accessor-pairs'],
      'array-callback-return': standard.rules['array-callback-return'],
      'dot-notation': standard.rules['dot-notation'],
      eqeqeq: standard.rules.eqeqeq,
      'no-debugger': standard.rules['no-debugger'],
      'no-labels': standard.rules['no-labels'],
      'no-use-before-define': standard.rules['no-use-before-define'],
      'prefer-const': standard.rules['prefer-const'],
      'prefer-regex-literals': standard.rules['prefer-regex-literals'],
      yoda: standard.rules.yoda,
      'no-constant-condition': standard.rules['no-constant-condition'],
      'no-empty': standard.rules['no-empty'],
      'no-redeclare': standard.rules['no-redeclare'],
      'no-self-assign': standard.rules['no-self-assign'],
      'no-unused-vars': standard.rules['no-unused-vars'],
      'use-isnan': standard.rules['use-isnan'],
      'valid-typeof': standard.rules['valid-typeof']
    }
  },
  {
    name: 'new files ts-standard (strict linter rules)',
    files: ['**/*.{ts,mts,tsx,vue,js}'],
    ignores: eslintMinimalFilesList,
    rules: standard.rules,
    plugins: standard.plugins,
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error'
    }
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended
)
