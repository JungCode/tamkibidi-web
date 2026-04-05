import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/shared/*.schemas.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    plugins: {
      perfectionist,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // TypeScript interface & type keys
      'perfectionist/sort-interfaces': ['error', { type: 'natural' }],
      // JSX props
      'perfectionist/sort-jsx-props': ['error', { type: 'natural' }],

      'perfectionist/sort-object-types': ['error', { type: 'natural' }],

      // Object literal keys
      'perfectionist/sort-objects': ['error', { type: 'natural' }],
      'simple-import-sort/exports': 'error',

      // Import / export ordering
      'simple-import-sort/imports': 'error',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
