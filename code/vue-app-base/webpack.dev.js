const common = require('./webpack.common');
const merge = require('webpack-merge');

/**
 * 开发环境配置文件
 * https://webpack.js.org/configuration/mode/#mode-development
 */
module.exports = merge(common, {
    mode: 'development'
});