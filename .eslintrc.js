module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',

  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'path-checker',
  ],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: [
          '**/*.stories.tsx',
        ],
      },
    ],
    'no-underscore-dangle': 'off',
    'react/no-array-index-key': 'off',
    'max-len': ['error', { code: 140, ignoreComments: true }],
    'i18next/no-literal-string': ['error', {
      markupOnly: true,
      ignoreAttribute: [
        'data-testid', 'to', 'target', 'align', 'direction', 'gap', 'justify', 'role', 'as', 'border',
      ],
    }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'path-checker/path-checker': ['error', { alias: '@' }],
    'path-checker/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],
    'path-checker/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
