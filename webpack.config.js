const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.hmr.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      modules: path.resolve(__dirname, 'modules/'),
      pipes: path.resolve(__dirname, 'pipes/'),
      utils: path.resolve(__dirname, 'utils/')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
}
