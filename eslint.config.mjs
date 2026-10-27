import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'
export default tseslint.config(
  ...nextVitals,
  {
    rules: {
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
)
