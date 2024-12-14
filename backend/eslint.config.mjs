import js from '@eslint/js'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jestPlugin from 'eslint-plugin-jest'

export default [
  { ignores: ['dist/**/*']},
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
]
