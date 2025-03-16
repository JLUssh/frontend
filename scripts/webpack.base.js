const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tailwindcss = require("tailwindcss");
const path = require('node:path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: {
        app: {
            import: path.resolve(__dirname, '../src/index.tsx'),
            dependOn: "react-vendors"
        },
        "react-vendors": ['react', 'react-router-dom', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[fullhash:8].js'
    },
    // resolve: {
    //     // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    //     extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    //     // 如果项目中只有 tsx 或 ts 可以将其写在最前面
    // },
    module: {
        rules: [
            {
                test: /\.((jsx?)|(tsx?))$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                                    useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                                    corejs: 3, // 使用 core-js@3 版本
                                },
                            ],
                            ['@babel/preset-typescript'],
                            ['@babel/preset-react', {
                                // 通过配这个，不用让每个file都导入React
                                "runtime": "automatic"
                            }],
                        ],
                    },
                }
            },
            {
                test: /\.css$/,
                // 限制loader的作用范围
                include: path.resolve(__dirname, '../src'),
                use: [
                    // 想要自动挂载样式，style-loader 可以帮我们实现，它负责将 css 样式通过 style 标签插入到 DOM 中。
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        // options: {
                        //     importLoaders: 1,
                        //     modules: true,
                        // },
                    },
                    {
                        loader: 'postcss-loader',
                        // options: {
                        //     postcssOptions: {
                        //         ident: 'postcss',
                        //         plugins: [
                        //             require('tailwindcss')
                        //         ]
                        //     }
                        // }
                        // plugins: [
                        //     tailwindcss,
                        // ]
                    }
                ],
                // 排除 node_modules 目录
                exclude: /\.module\.css$/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             limit: 2000,
                //             // //如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
                //             name: 'assets/img/[name].[contenthash:5].[ext]',
                //             // //img:图片打包的文件夹；
                //             // //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                //             // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                //         },
                //         // filename: 'assets/img/[hash:8].[ext]'
                //     }
                // ]
                type: 'asset',
                generator: {
                    filename: 'assets/img/[name].[contenthash:5].[ext]'
                }
            },
            {
                // 处理css module
                test: /\.module\.css$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    }
                ]
            }
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },

            // {
            //     test: /\.json$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: 'json-loader'
            //     }]
            // },
        ],
        //减少模块解析
        // noParse: /jquery/
    },
    plugins: [
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**/*']
            cleanOnceBeforeBuildPatterns: ['**/*']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            // 将css单独提测出来放在assets/css 下
            filename: 'assets/css/[fullhash:8].css'
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('../dll/React.manifest.json')
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('../dll/$.manifest.json')
        // })
        new BundleAnalyzerPlugin()
    ],

    //构建过程中控制台的输出内容
    stats: {
        colors: true, // 打包时使用不同的颜色区分信息
        modules: false, // 打包时不显示具体模块信息
        entrypoints: false, // 打包时不显示入口模块信息
        children: false, // 打包时不显示子模块信息
        errorDetails: true,
    },
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserWebpackPlugin({
    //             terserOptions: {
    //                 format: {
    //                     comments: false,
    //                 },
    //             },
    //             extractComments: false,
    //         }),
    //     ],
    // },

    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         name: 'common'
    //     }
    // }

    // watch: true,

    resolve: {
        alias: {
            "@": path.resolve(__dirname, '../src'),
            '@pag': path.resolve(__dirname, '../src/pages'),
            '@ass': path.resolve(__dirname, '../src/assets'),
            '@comp': path.resolve(__dirname, '../src/components'),
        },
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    }
}