/*
 模块引用
 */
var WebpackCleanPlugin = require('webpack-clean'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

/*
 反斜杠转为斜杠
 */
function parseSlash(dir) {
    return dir && dir.replace(/\\/g, '/')
}

var config = {
    // 监测文件变化
    watch: true,
    // 使用什么方式进行环境编译，这里使用electron环境编译
    target: 'electron',
    // 入口
    entry: [
        './app/src/entry.js'
    ],
    // 输出
    output: {
        path: parseSlash(__dirname + '/app/build/'),
        filename: 'js/bundle.js',
        /*
         公共资源访问地址
         * 统一将反斜杠转为斜杠，避免反斜杠引起的路径问题
         * 将项目路径下的app/build/设置为公共资源访问地址
         */
        publicPath: parseSlash(__dirname + '/app/build/')
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
            /*
             解析jade文件
             */
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
            {
                test: /\.(png|jpe?g)$/i,
                // limit字段待变图片打包限制，小于8192自动转成base64码引用，
                // 大于8192以正常形式打包
                loader: 'url-loader?limit=81&name=image/[hash:8].[name].[ext]',
            }
        ]
    },
    // vue相关配置
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            less: ExtractTextPlugin.extract('css!less')
        }
    },
    // babel相关配置
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    // 模块解析的选项
    resolve: {
        // require时省略的扩展名
        extensions: ['', '.js', '.vue'],
        /*
         alias为请求重定向，将用户的请求重定向到另一个路径
        */
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
            'vue$': 'vue/dist/vue.js',
            'jquery$': 'jquery/dist/jquery.js'
        }
    },
    // 选择开发人员工具
    devtool: 'eval-source-map',
    plugins: [
        /*
         清除文件
         */
        // new WebpackCleanPlugin([
        //     'build/*'
        // ], parseSlash(__dirname + '/app/')),
        /*
         热替换插件
         */
        // new webpack.HotModuleReplacementPlugin(),
        /*
         用来简化创建服务与webpack的html文件
         */
        new HtmlWebpackPlugin({
            template: './app/index.jade'
        }),
        /*
         合并页面上通过模块引用进入的style标签块的css属性
         并输出一个.css文件
         ps：但是该功能会让HMR对css样式的局部更新失效
         */
        new ExtractTextPlugin('css/index.css'),


    ]
}

module.exports = config