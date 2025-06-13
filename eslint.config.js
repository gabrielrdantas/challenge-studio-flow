import js from '@eslint/js';
import reactImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '.eslintcache',
      '.eslintrc.cjs',
      'routeTree.gen.ts'
    ]
  },
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      prettier: prettier,
      import: reactImport,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-var': 'error',
      'no-alert': 'error',
      'no-console': 'error',
      'prefer-const': 'error',
      'no-empty': ['error', {allowEmptyCatch: true}],
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-relative-packages': 'error',
      'import/no-relative-parent-imports': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-empty-named-blocks': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-import-module-exports': 'error',
      'import/newline-after-import': 'error',
      'import/group-exports': 'error',
      'import/exports-last': 'error',
      'import/no-useless-path-segments': ['error', {noUselessIndex: true}],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],

      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          useTabs: false,
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          quoteProps: 'as-needed',
          jsxSingleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'lf',
          plugins: ['@trivago/prettier-plugin-sort-imports'],
          importOrder: ['^(^react$|@react|react)', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          overrides: [
            {
              files: ['**/package.json'],
              options: {
                useTabs: false
              }
            },
            {
              files: ['**/.mdx'],
              options: {
                proseWrap: 'preserve',
                htmlWhitespaceSensitivity: 'ignore'
              }
            }
          ]
        }
      ],
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}]
    }
  }
);
