module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  rules: {
    semi: ['error', 'always'],
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
