import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended', ...tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.jest, ...globals.node } },
  },
  {
    plugins: { '@typescript-eslint': tseslint.plugin },

    rules: {
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  globalIgnores(['dist/*', 'samples/*', 'jest.config.js', 'coverage/*']),
]);
