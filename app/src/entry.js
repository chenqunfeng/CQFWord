// 引入vue
import Vue from "vue"
import app from './components/app.vue'
// //开启错误提示
Vue.config.debug = true

new Vue(app).$mount('#app')