const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');

const APP_PATH = path.resolve(__dirname, '../src');

// const bundleAnalyzerReport = argv.report;

// if (bundleAnalyzerReport) {
//     webpackConfig.plugins.push(new BundleAnalyzerPlugin({
//         analyzerMode: 'static',
//         openAnalyzer: false,
//         reportFilename: path.join(config.assetsRoot, './report.html')
//     }));
// }

module.exports =  {
    devtool: false,
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: config.assetsRoot,
        sourcePrefix: ''
    },
    amd: {
        //允许Cesium兼容 webpack的require方式
        toUrlUndefined: true
    },
    node: {
        fs: 'empty'
    },
    module: { 
        unknownContextCritical: false,
        noParse: '/jquery|lodash/',  // 不去解析三方库
        rules: [
            // 把这个配置放在所有loader之前
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: [APP_PATH],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                    emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                    fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
                }
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, 'node_modules/cesium/Source'),
                sideEffects: false,
                use: [{ // Cesium源码里包含了一些开发错误和警告信息，但是产品中是不需要的。
                    // 因为没有webpack内置的方式去删除这些警告，我们将使用 strip-pragma-loader。
                    loader: 'strip-pragma-loader',
                    options: {
                        pragmas: {
                            debug: false
                        }
                    }
                }]
            },
            {
                oneOf: [
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.(j|t)sx?$/,
                        include: APP_PATH,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        '@babel/preset-react',  // jsx支持
                                        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
                                    ],
                                    plugins: [
                                        '@babel/plugin-syntax-dynamic-import',
                                        [
                                            "import",
                                            {
                                                "libraryName": "antd",
                                                "libraryDirectory": "es",
                                                "style": "css" // `style: true` 会加载 less 文件
                                            }
                                        ],
                                        ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
                                    ],
                                    cacheDirectory: true // 加快编译速度
                                }
                            },
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    silent: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(less|css)$/,
                        use: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: false
                                }
                            },
                            'postcss-loader',
                            {
                                loader: 'less-loader',
                                options: { javascriptEnabled: true }
                            }
                        ]
                    },
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack']
                    },
                    {
                        test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 6 * 1024,
                            name: 'static/media/[name].[ext]',
                        }
                    },
                    {
                        exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[path][name].[hash:8].[ext]',
                        }
                    },
                    {
                        test: /\.(jpe?g|png|gif|svg)$/,
                        loader: 'image-webpack-loader',
                        enforce: "pre"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src/')
        }
    },
    plugins: [
        // 清理打包目录
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: config.indexPath,
            minify: {
                html5: true
            },
            hash: false
        }),
        // 在html模板中能够使用环境变量
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // 在js代码中能够使用环境变量(demo: process.env.NODE_ENV === 'production')
        // new webpack.DefinePlugin(env.stringified),
        // 忽略moment的国际化库
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        new CopyWebpackPlugin([
            {
                from: 'public',
                ignore: ['index.html']
            }
        ]),
        // new webpack.DllReferencePlugin({
        //     manifest: require('../public/vendor.json')
        // })
    ],
    optimization: {

    }
}
