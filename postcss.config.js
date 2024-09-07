const tailwindcss = require('tailwindcss');
// //用于将 Tailwind CSS 的类名转换为实际的 CSS 样式。

// const autoprefixer = require("autoprefixer");

// const autoprefixer = require('autoprefixer');
// //用于自动添加浏览器前缀，以便确保在不同浏览器中都能正常显示。

// const postcssImport = require('postcss-import');
// //用于处理 @import 规则，以便在 CSS 中引入其他 CSS 文件

// module.exports = {

//     plugins: [
//         postcssImport,
//         tailwindcss('./tailwind.config.js'), // 这里要配置刚刚新建的tailwind.config.js
//         autoprefixer
//     ],

// }

module.exports = {

    plugins: [
        // 'postcss-preset-env',
        tailwindcss
    ],

}

// module.exports = {

//     plugins: {
//         tailwindcss: {},
//         autoprefixer: {},
//     },

// }