const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const portfinder = require('portfinder');
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
        new HtmlWebpackPlugin({
            template: config.indexPath,
            minify: {
                html5: true
            },
            hash: false
        }),
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

module.exports = new Promise((resolve, reject) => {
    // 搜寻可用的端口号
    portfinder.basePort = config.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) reject(err)
        else {
            devWebpackConfig.devServer.port = port;
        }
        resolve(devWebpackConfig)
    })
});

