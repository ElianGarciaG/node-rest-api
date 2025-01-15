import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  { rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^_' }] } },
]
