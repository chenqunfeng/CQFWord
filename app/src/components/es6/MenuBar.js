import electron from 'electron'
import $ from 'jquery'
const ipcRenderer = electron.ipcRenderer
export default {
    data () {
        return {
            'unmax': true
        }
    },
    methods: {
        dict(event) {
            var bdict = $('.menu-button-dict'),
                bwordBook = $('.menu-button-word-book')

            if (bdict.hasClass('active')) 
                return

            bdict.addClass('active')
            bwordBook.removeClass('active')
            ipcRenderer.send('window-dict')
        },
        wordBook(event) {
            var bdict = $('.menu-button-dict'),
                bwordBook = $('.menu-button-word-book')

            if (bwordBook.hasClass('active'))
                return

            bdict.removeClass('active')
            bwordBook.addClass('active')
            ipcRenderer.send('window-word-book')
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