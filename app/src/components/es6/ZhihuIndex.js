import config from './../../../../config.js'
import fetchAPI from './common/fetchAPI.js'
import store from './../../store/index.js'
module.exports = {
    data () {
        return {
            scrollTop: 0,
            offset: 10,
            start: 0
        }
    },
    computed: {
        list () {
            return store.state.zhihu.list
        }
    },
    created() {
        let that = this,
            id = localStorage.getItem('id'),
            url = config.server + '/zhihu/getList',
            f
            ;
        store.commit('startLoading')
        if (id)
            url += '?id=' + id
        f = new fetchAPI()
        f.fetchJSON(url, {
            method: 'POST',
            body: {
                params: {
                    offset: that.offset,
                    start: that.start
                },
                method: 'next'
            }
        }).then(function(data) {
            data.map(function(unit) {
                unit.comment = []
                unit.commentMode = false
                unit.summaryMode = true
                unit.answer.summary += '<a class="toogle-content">显示全部</a>'
            })
            store.commit('setList', data)
            store.commit('finishLoading')
            that.start += data.length
        })
    },
    methods: {
        pages (count) {
            return parseInt(count / 30) + 1
        },
        loadMore() {
            let that = this,
                id = localStorage.getItem('id'),
                url = config.server + '/zhihu/getList',
                f
                ;
            store.commit('startLoading')
            if (id)
                url += '?id=' + id
            f = new fetchAPI()
            f.fetchJSON(url, {
                method: 'POST',
                body: {
                    params: {
                        offset: that.offset,
                        start: that.start
                    },
                    method: 'next'
                }
            }).then(function(data) {
                data.map(function(unit) {
                    unit.comment = []
                    unit.commentMode = false
                    unit.summaryMode = true
                    unit.answer.summary += '<a class="toogle-content">显示全部</a>'
                })
                store.commit('appendList', data)
                store.commit('finishLoading')
                that.start += data.length
            })
        },
        logout() {
            console.log('登出')
            store.commit('zhihuLogout')
        },
        toogleContent(event) {
            let e = event.target,
                that = this
                ;
            if (e.classList.contains('toogle-content')) {
                let index = e.parentNode.getAttribute('index')
                // if (store.state.zhihu.list[index].summary) {
                //     that.scrollTop = document.querySelector('.vertical-scrollbar').scrollTop
                // } else {
                //     document.querySelector('.vertical-scrollbar').scrollTop = that.scrollTop + 'px'
                // }
                store.commit('setListMode', index)
            }
        },
        toogleComment(event) {
            let e = event.target;
            if (e.classList.contains('toogle-comment')) {
                let index = e.parentNode.getAttribute('index'),
                    id = localStorage.getItem('id'),
                    answerId = store.state.zhihu.list[index].answer.answerId,
                    postId = store.state.zhihu.list[index].answer.postId,
                    url = config.server + '/zhihu/getComment',
                    f
                    ;
                if (id)
                    url += '?id=' + id
                f = new fetchAPI()
                f.fetchJSON(url, {
                    method: 'POST',
                    body: {
                        answerId: answerId,
                        postId: postId
                    }
                }).then(function(data) {
                    store.commit('setComment', {
                        index: index,
                        comment: data.data
                    })
                    store.commit('setCommentMode', index)
                })
            }
        }
    }
}