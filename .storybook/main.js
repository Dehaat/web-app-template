const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  staticDirs: ['../static-files'],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      routes: path.resolve(__dirname, '../src/app/routes'),
      components: path.resolve(__dirname, '../src/app/components'),
      store: path.resolve(__dirname, '../src/store'),
      config: path.resolve(__dirname, '../src/app/config'),
      app: path.resolve(__dirname, '../src/app'),
    }
    return config
  },
}
