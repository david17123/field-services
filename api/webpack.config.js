const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = (env = {}) => {
  const isProduction = !!env.production

  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
  }

  return config
}

module.exports = webpackConfig
