const { merge } = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
    // mode: 'production'
    mode: 'development',
    // cache: false,
    cache: true,
});