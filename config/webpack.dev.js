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
    optimization: {
        // 我们去查看哪些导出的模块被使用，然后再进行打包
        usedExports: true,
        // webpack默认会把Cesium和整个程序代码打进一个 chunk中，最终这个库非常庞大。
        // 我们也可以用CommonChunksPlugin把Cesium打到它自己的包，提升程序的性能。
        // 如果最终你的程序创建了多个chunks，他们可以引用一个通用的cesiumchunk。
        // 最新版webpack使用config.optimization.splitChunks去设置
        splitChunks: {
            maxInitialRequests: Infinity,
            minSize: 30000,
            maxSize: 500000,
            cacheGroups: {
                commons: {
                    name: 'Cesium',
                    test: /[\\/]node_modules[\\/]cesium/,
                    priority: 10,
                    minChunks:2,
                    chunks: 'initial'
                }
            }
        }
    }
});

module.exports = devWebpackConfig
