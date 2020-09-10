const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "axios",
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "redux",
  "redux-thunk",
  "chart.js",
  "classnames",
  "react-transition-group",
];
const devServer = {
  port: 4000,
  open: true,
  historyApiFallback: true,
};

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.scss$/,
      },
      {
        loader: "file-loader",
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
      },
    ],
  },
  optimization: {
    runtimeChunk: "single", // enable "runtime" chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  devServer,
};
