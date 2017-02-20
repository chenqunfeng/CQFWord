// 目前懒加载会与extract-text-webpack-plugin打包css样式插件存在bug
// 这是extract-text-webpack-plugin存在的bug，在webpack中将extract-text-webpack-plugin插件的allChunks设置为true即可
const zhihu = resolve => require(['./../components/ZhihuContain'], resolve)
const dict = resolve => require(['./../components/NewsContain'], resolve)

module.exports = [
    {
        path: '/',
        name: 'zhihu',
        component: zhihu
    },
    {
        path: '/dict',
        name: 'dict',
        component: dict
    },
    {
        path: '/zhihu',
        name: 'zhihu',
        component: zhihu
    },
]