import electron from 'electron'
import $ from 'jquery'
const ipcRenderer = electron.ipcRenderer
module.exports = {
    data () {
        return {
            'unmax': true
        }
    },
    methods: {
        switchBtn(event) {
            var t = $(event.target),
                active = $('.menu-button').find('.active')

            if (t.get(0) === active.get(0)) 
                return

            active.removeClass('active')
            t.addClass('active')
        },
        minimize() {
            ipcRenderer.send('window-event', 'minimize')
        },
        maximize() {
            this.unmax = false
            ipcRenderer.send('window-event', 'maximize')
        },
        unmaximize() {
            this.unmax = true
            ipcRenderer.send('window-event', 'unmaximize')
        },
        close() {
            ipcRenderer.send('window-event', 'close')
        }
    }
}