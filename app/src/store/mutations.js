const mutations = {
    startLoading (state) {
        state.loading = true
    },
    finishLoading (state) {
        state.loading = false
    },
    setZhihu (state, opts) {
        if (opts) {
            if (opts._xsrf) state.zhihu._xsrf = opts._xsrf
            if (opts.captcha) state.zhihu.captcha = opts.captcha
        } 
    },
    zhihuLogined (state) {
        state.zhihu.status = 'logined'
    },
    zhihuLogout (state) {
        state.zhihu.status = 'logout'
        localStorage.removeItem('id')
    },
    setList (state, list) {
        state.zhihu.list = list
    },
    appendList (state, list) {
        state.zhihu.list = state.zhihu.list.concat(list)
    },
    setComment (state, opts) {
        let index = opts.index,
            comment = opts.comment
            ;
        state.zhihu.list[index].comment = comment
    },
    setListMode (state, index) {
        let cur = state.zhihu.list[index].summaryMode
        state.zhihu.list[index].summaryMode = !cur
    },
    setCommentMode (state, index) {
        let cur = state.zhihu.list[index].commentMode
        state.zhihu.list[index].commentMode = !cur
    }
}
module.exports = mutations

