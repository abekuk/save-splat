import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },
  {
    // Verbatim ports of the algorithmic core. The `var`-scoped, tightly aligned style is
    // what was tested against the reference numbers; reflowing it to modern idiom would
    // be an unreviewed rewrite of maths that currently produces known-correct output.
    files: [
      'src/core/geometry/extract.ts',
      'src/core/ply/parse.ts',
      'src/core/orientation.ts',
      'src/core/synthetic.ts',
    ],
    rules: {
      'no-var': 'off',
      'prefer-const': 'off',
      'no-inner-declarations': 'off',
      'no-useless-assignment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);
