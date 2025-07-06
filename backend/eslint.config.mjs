import parser from '@typescript-eslint/parser';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const flatConfigs = tseslintPlugin.flatConfigs || tseslintPlugin.default?.flatConfigs;
const prettierRecommended = prettierPlugin.configs.recommended;

export default [
  ...(flatConfigs || []),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierRecommended.rules,
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
];
