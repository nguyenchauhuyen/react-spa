const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VENDOR_LIBS = [
    'axios',
    'bootstrap',
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk',
    'chart.js',
    'classnames',
    'react-transition-group',
];
const devServer = {
    port : 4000,
    open : true,
    disableHostCheck : true,
    historyApiFallback : true,
    overlay : true,
    stats : 'minimal',
    inline : true,
    compress : true,
    contentBase : '/'
};

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules/'
            },
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: /\.css$/
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                test: /\.scss$/
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
            }
        ]
    },
    plugins : [
        // new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                context: './public/',
                from: '**/*',
                to: './'
            }
        ], { /* options */ }),
        new webpack.ProvidePlugin({
            '$' : 'jquery',
            'jQuery' : 'jquery',
            'window.$' : 'jquery',
            'window.jQuery' : 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names : ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template : 'src/index.html'
        })
    ],
    devServer
}