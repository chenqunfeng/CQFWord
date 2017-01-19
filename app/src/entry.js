// 引入vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'
import routerConfig from './router/router.js'
import app from './components/app.vue'
// //开启错误提示
Vue.config.debug = true

Vue.use(VueRouter)

const router = new VueRouter({routes: routerConfig, mode: 'history'})

new Vue({
    router,
    el: '#app',
    store,
    render: h => h(app)
})