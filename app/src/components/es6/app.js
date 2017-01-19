import Vue from 'vue'
import menuBar from './../MenuBar.vue'
import searchBox from './../SearchBox.vue'
import store from './../../store/index.js'

Vue.component('menu-bar', menuBar)
Vue.component('search-box', searchBox)

module.exports = {
    data () {
        return {
            // loading: true
        }
    },
    computed: {
        /*
         不知道为什么在data中设置loading: store.state.loading是没有双向数据绑定的
         但是计算属性便是一个双向数据绑定
         confused！感觉是一个坑
         */
        loading () {
            return store.state.loading
        }
    }
}