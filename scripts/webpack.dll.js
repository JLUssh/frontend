const path = require('node:path');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: {
        "react": ["react"],
        "$": ["jquery"]
    },
    output: {
        path: path.resolve(__dirname, '../dist/dll'),
        filename: "[name].js",
        library: "[name]",
    },
    //生成相应的资源清单，作为打包时的参考
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dll', '[name].manifest.json'),
            name: '[name]',
            format: true
        })
    ]
}