const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    devtool: 'source-map',
    devServer: {
        // hot: true, 
        hotOnly: true,
        contentBase: './public',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },     
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024, //10 KB
                        esModule: false,
                    }
                }
            }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: '!!handlebars-loader!src/index.hbs'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}