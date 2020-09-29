const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single', // enable "runtime" chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(css|scss|sass)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     { loader: 'css-loader', options: { url: false, sourceMap: true } },
      //     { loader: 'sass-loader', options: { sourceMap: true } },
      //   ],
      // },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(bmp|jpe?g|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/media/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/css'],
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[hash].css',
    // }),
  ],
});
