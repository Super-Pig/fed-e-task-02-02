const common = require('./webpack.common');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

/**
 * 生产环境配置文件
 * https://webpack.js.org/configuration/mode/#mode-production
 */
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: 'public',
                to: '.'
            }]
        })
    ],
    /**
     * Since version 4 webpack runs optimizations for you depending on the chosen mode, 
     * still all optimizations are available for manual configuration and overrides.
     */
    optimization: {
        usedExports: true,      //打包过程移除未被引用的模块
        minimize: true,             //压缩js代码；进行 tree shaking; production 模式默认开启该配置
        concatenateModules: true,   //根据模块依赖关系图谱，把模块打包到单个模块文件中；production 模式默认开启该配置
        sideEffects: true,
    }
})
