const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * 通用的配置文件
 * 该配置在develop环境和prod环境下的打包流程中通用
 * 另外不同的环境定义各自的配置文件，通过 webpack-merge 来复用 common 配置，并且可覆盖配置项
 */
module.exports = {
    mode: 'none',               //在这里使用 none 模式，不开启webpack内建的optimizations，在具体环境的配置文件中覆盖该配置 
    entry: './src/main.js',     //打包入口文件
    output: {                   //打包结果输出到 dist/main.js 
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    devtool: 'source-map',      //开启source-map
    devServer: {                    //devServer 配置作用于 webpack-dev-server
        // hot: true, 
        hotOnly: true,              //开启 HMR, 同时需要启用  webpack.HotModuleReplacementPlugin 插件; 当编译失败时，不刷新页面
        contentBase: './public',    //指定静态资源目录
    },
    module: {
        rules: [
            {
                test: /\.vue$/,             //vue 加载器配置, 同时需要启用 VueLoaderPlugin
                use: [{
                    loader: 'vue-loader'
                }]
            }, {
                test: /\.css$/,             //css加载器配置
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.less$/,            //less 加载器配置
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },     
            {
                test: /\.png$/,             //图片加载器配置； 
                use: {                      
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,   //图片文件大小在 10KB 以内的话，会被转换成 base64；否则使用file-loader加载；
                        /**
                         * 默认情况下 file-loader 采用 ESM 语法生成 js 模块
                         * 使用 ESM 模块可以使用 module concatenation 和 Tree Shaking
                         * 这里由于图片是通过 img 的src属性加载的，所以在这里关闭 ESM 模式
                         */
                        esModule: false,    
                    }
                }
            }]
    },
    plugins: [
        new CleanWebpackPlugin(),           //清除dist目录
        /**
         * 自动生成index.html
         */
        new HtmlWebpackPlugin({             
            template: '!!handlebars-loader!src/index.hbs'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}