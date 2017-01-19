import config from './../../../../config.js'
import fetchAPI from './common/fetchAPI.js'
import store from './../../store/index.js'
module.exports = {
    data () {
        return {
            account: '',
            password: '',
            captcha: '',
            phone_reg: /^1(3|4|5|7|8)\d{9}$/
        }
    },
    computed: {
        captcha_img () {
            return store.state.zhihu.captcha
        }
    },
    methods: {
        submit (event) {
            let data = {
                    password: this.password,
                    captcha: this.captcha,
                    _xsrf: store.state.zhihu._xsrf,
                },
                f
                ;
            if (!this.account || !this.password || !this.captcha) {
                console.log('缺少填写的项目')
                return;
            }
            if (this.phone_reg.test(this.account)) {
                data.phone_num = this.account;
            } else {
                data.email = this.account;
            }
            store.commit('startLoading')
            f = new fetchAPI()
            f.fetchJSON( config.server + '/zhihu/login', {
                method: 'POST',
                body: data
            }).then(function(data) {
                if (0 === data.r) {
                    localStorage.setItem('id', data.id)
                    store.commit('zhihuLogined')
                } 
                store.commit('finishLoading')
            })
        }
    }
}