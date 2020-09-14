const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 4000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(bmp|jpe?g|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',
        },
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
