const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc.json'), 'utf8'),
)

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],
  env: {
    jest: true,
    browser: true,
  },
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 2 }],
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: false,
      },
    ],
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './src/webpack/webpack.prod.babel.js',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
