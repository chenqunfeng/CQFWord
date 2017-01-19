import config from './../../../../config.js'
import fetchAPI from './common/fetchAPI.js'
import login from './../ZhihuLogin.vue'
import index from './../ZhihuIndex.vue'
import store from './../../store/index.js'
module.exports = {
    data () {
        return {}
    },
    components: {
        logined: index,
        logout: login
    },
    created() {
        let that = this,
            id = localStorage.getItem('id'),
            url = config.server + '/zhihu',
            f
            ;
        store.commit('startLoading')
        if (id)
            url += '?id=' + id
        f = new fetchAPI(url)
        f.fetchJSON().then(function(data) {
            if ('logout' === data.status) {
                store.commit('setZhihu', data)
                store.commit('zhihuLogout')
            } else {
                store.commit('zhihuLogined')
            }
            store.commit('finishLoading')
        })
    },
    computed: {
        currentView () {
            return store.state.zhihu.status
        }
    }
}