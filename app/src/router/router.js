const zhihu = resolve => require(['./../components/ZhihuContain'], resolve)
const dict = resolve => require(['./../components/NewsContain'], resolve)

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