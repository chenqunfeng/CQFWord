// 目前懒加载会与extract-text-webpack-plugin打包css样式插件存在bug
// const zhihu = resolve => require(['./../components/ZhihuContain'], resolve)
// const dict = resolve => require(['./../components/NewsContain'], resolve)

import zhihu from './../components/ZhihuContain'
import dict from './../components/NewsContain'

module.exports = [
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