module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          parser: 'flow',
        },
      ],
    },
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
