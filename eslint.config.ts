import globals from 'globals'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import eslintMinimalFilesList from './.config/eslintminimal.json'
import standard from 'neostandard'

const standardStyles = standard({ ts: true })
  .find((config) => config.name === 'neostandard/style') || {}

export default defineConfigWithVueTs(
  globalIgnores(['.config/', 'dist/', 'node_modules/']),
  {
    languageOptions: {
      globals: globals.browser
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
    ignores: eslintMinimalFilesList
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended
)
