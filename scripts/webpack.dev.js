const path = require('node:path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        // static: {
        //     directory: path.resolve(__dirname, 'dist'),
        // },
        open: true, // 编译完自动打开浏览器
        port: 8080,
        hot: true, //实现热替换 HMR hot module replacement
        // compress: true,
        historyApiFallback: true,
        proxy: [{
            context: ["/api", "/user", "/uploads"],
            target: "http://localhost:5000"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // cache: false
});