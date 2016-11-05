// 引入vue和vue-router
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import app from './components/app.vue'
// //开启错误提示
// // Vue.config.debug = true
const foo = { template: '<div>开启electron vue webpack 之旅！！</div>' }
const routes = [
    {
        path: '/app',
        component: app
    },
    {
        path: '/foo',
        component: foo
    }
]
const router = new VueRouter({ routes })
// new Vue(app)
new Vue({
    router
}).$mount('#app')

// new Vue(foo).$mount('#app1')