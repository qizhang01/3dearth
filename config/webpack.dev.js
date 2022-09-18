const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const webpack = require('webpack');
const config = require('./config');
const cesiumSource = 'node_modules/cesium/Build/Cesium'
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const devWebpackConfig = merge.smart(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                oneOf: []
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // Cesium载入静态的资源的相对路径
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        // 拷贝Cesium 资源、控价、web worker到静态目录
        new CopyWebpackPlugin([{
            from: path.join(cesiumSource, 'Workers'),
            to: 'Workers'
        }]),
        new CopyWebpackPlugin([{
            from: path.join(cesiumSource, 'Assets'),
            to: 'Assets'
        }]),
        new CopyWebpackPlugin([{
            from: path.join(cesiumSource, 'ThirdParty'),
            to: 'ThirdParty'
        }]),
        new CopyWebpackPlugin([{
            from: path.join(cesiumSource, 'Widgets'),
            to: 'Widgets'
        }]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        ...config.devServer
    },
});

module.exports = devWebpackConfig
