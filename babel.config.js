module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    production: {
      only: ['./src'],
      ignore: ['./webpack'],
      plugins: [
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      presets: [['@babel/preset-env']],
    },
  },
}
