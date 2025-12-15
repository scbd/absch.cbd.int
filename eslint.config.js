import globals from 'globals'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores, defineConfig } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import eslintMinimalFilesList from './.config/eslintminimal.json' with { type: 'json' }
import standard from 'neostandard'
import love from 'eslint-config-love'

const standardStyles = standard({ ts: true })
  .find((config) => config.name === 'neostandard/style') || {}

const vueTs = defineConfigWithVueTs([ 
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
])


export default defineConfig([ 
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
  vueTs,
  {
    ...love,
        files: ['**/*.{ts,js}'],
},
])
