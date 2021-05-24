/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const ESLintPlugin = require('eslint-webpack-plugin')

const getEnvKeys = () =>
  dotenv.config({ path: path.join(__dirname, 'env/.env') })

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output,
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              stripdeclarations: true,
              iesafe: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin(getEnvKeys()),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['node_modules', 'build'],
    }),
  ]),
  resolve: {
    // Define your folder resolve path used in import or require
    alias: {
      app: path.resolve(process.cwd(), 'src/app'),
      routes: path.resolve(process.cwd(), 'src/app/routes'),
      config: path.resolve(process.cwd(), 'src/app/config'),
      components: path.resolve(process.cwd(), 'src/app/components'),
      utils: path.resolve(process.cwd(), 'src/utils'),
      store: path.resolve(process.cwd(), 'src/store'),
    },
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.css', '.ts', '.tsx'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},

  // webpack-dev-server configuration
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
})
