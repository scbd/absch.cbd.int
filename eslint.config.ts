import globals from 'globals'
import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import eslintMinimalFilesList from './.config/eslintminimal.json'
import standard from 'neostandard'
import love from 'eslint-config-love'

const standardStyles = standard({ ts: true })
  .find((config) => config.name === 'neostandard/style') || {}

export default defineConfigWithVueTs(
  globalIgnores(['.config/', 'dist/', 'node_modules/']),
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    ...love,
    files: ['**/*.js', '**/*.ts']
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
    ignores: eslintMinimalFilesList
  },
  pluginVue.configs['flat/recommended']
  // vueTsConfigs.recommended
)
