var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {

    watch: true,

    target: 'electron',
    // 入口
    entry: [
        './app/src/entry.js'
    ],
    // 输出
    output: {
        path: __dirname + '/app/build',
        filename: 'js/bundle.js',
        publicPath: ''
    },
    // 服务器配置
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true
    },
    // 加载器
    module: {
        loaders: [
            /*
             解析.vue文件
             * vue文件中有三个部分styles,script和template
             * 每个部分有一个lang参数，代表解析引擎
             * 当解析vue文件时，vue-loader会根据lang参数对应的预编译语言
             * 去使用对应的模块解析对应的部分
             * 若是想把三个部分做进一步的分离，则可以使用src属性
             * 详情http://vue-loader.vuejs.org/en/start/spec.html
             */
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.jade$/,
                loader: 'jade'
            },
            /*
             使用babel解析.js文件
             */
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            less: ExtractTextPlugin.extract('css!less')
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名
        extensions: ['', '.js', '.vue']
    },
    devtool: 'eval-source-map',
    resolve: {
        /*
         使用独立构建方式
         * 构建有两种方式，独立构建和运行构建
         * 独立构建包括编译和支持template选项。但是它依赖浏览器，
           不能用来为服务器端渲染
         * 运行构建不包括模版编译，不支持template选项，只能使用
           render选项，但只支持单文件组件中起作用。同时，运行构
           建只有独立构建大小的30%
         PS：若不使用该配置，而是单独使用 import Vue from "vue"，
         则是运行构建的方式
         */
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        /*
         热替换插件
         */
        // new webpack.HotModuleReplacementPlugin(),
        /*
         用来简化创建服务与webpack的html文件
         */
        new htmlWebpackPlugin({
            template: './app/index.jade'
        }),
        /*
         合并页面上通过模块引用进入的style标签块的css属性
         并输出一个.css文件
         */
        new ExtractTextPlugin('css/index.css')
    ]
}