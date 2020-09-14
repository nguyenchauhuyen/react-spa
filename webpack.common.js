const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: './assets',
        },
      ],
    }),
  ],
  entry: {
    bundle: './src/index.js',
    vendor: [
      'axios',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'chart.js',
      'classnames',
      'react-transition-group',
    ],
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
