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
    rules: {}
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  }
);
