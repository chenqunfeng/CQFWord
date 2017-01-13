import config from './../../../../config.js'
import fetchAPI from './common/fetchAPI.js'

module.exports = {
    data () {
        return {
            status: 'logout',
            offset: 10,
            start: 0
        }
    },
    created() {
        var that = this
        var f = new fetchAPI('http://104.223.6.204:3000/zhihu')
        f.fetchJSON().then(function(data) {
            if ('logout' === data.status) {
                console.log('还未登录')
            } else {
                console.log('已经登录')
            }
        })
    }
}