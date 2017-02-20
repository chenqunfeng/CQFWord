import electron from 'electron'
import $ from 'jquery'
module.exports = {
    data () {
        return {
        }
    },
    methods: {
        back() {
            history.back()
            console.log('back')
        },
        forward() {
            history.forward()
            console.log('forward')
        }
    }
}