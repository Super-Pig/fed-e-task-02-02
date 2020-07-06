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
        usedExports: true,
        minimize: true,
        concatenateModules: true,
        sideEffects: true,
    }
})
