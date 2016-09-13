Component = require '../common/Component'
wordBook = require '../../../main/fileController'

class WordBook extends Component.Components

    # 构造函数
    constructor: (selector, key) ->
        super selector
        @init key

    # 初始化
    init: (key) ->
        console.log "#{key} init"
        @key = key or 'unfamiliarBook'
        @wordBook = wordBook

    #设置当前文件指针
    getWords: () ->
        console.log "#{@key} getWords"

    # 能否进入学习
    canLearn: () ->
        return @currentBook and @currentBook.allCount > @currentBook.hasLearningWordCount

    # 渲染
    render: () ->
        @getWords().append().eventBind()

    # 添加节点到contain中
    append: () ->
        @contain.appendChild @template()
        return @

    # 模版
    template: () ->
        console.log "#{@key} template"

    # 事件绑定
    eventBind: () ->
        c = @contain.querySelector(".#{@key} .beginLearning")
        c and c.addEventListener 'click', () =>
            if @canLearn()
                localStorage.setItem "currentBook", @key
                ipcRenderer.send 'change-learning-window'
            else
                alert '该单词本没有单词'
        return @

module.exports = WordBook
