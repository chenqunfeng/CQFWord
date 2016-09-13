Component = require './Component'
wordBook = require '../../../main/fileController'

class SearchResult extends Component.Components

    # 构造函数
    constructor: (selector) ->
        super selector
        @init()

    # 初始化
    init: () ->
        wordBook.openFile('unfamiliarBook.json')
        @ufWords = wordBook.readSettings 'words'

    # 设置数据
    setData: (data) ->
        if "object" is typeof data
            @data = data
        return @

    # 渲染
    render: () ->
        @contain.innerHTML = @template()
        @setSomeDom()
            .eventBind()

    # 模版
    template: () ->
        html = """
            <div class="wordContain borderBox">
                <div class="wordContainTop borderBox">
                    <div class="wordInfo fl">
                        <div class="word fl" title="单词"></div>
                        <div class="pron fl" title="拼注"></div>
                    </div>
                    <div class="wordPlay fl">
                        <span class="wordPlayIcon pointer" title="播放"></span>
                        <audio class="wordPlayAudio" src=""></audio>
                    </div>
                </div>
                <div class="wordExplain borderBox fl">
                    <p title="单词释义"></p>
                </div>
            </div>
            <div class="wordFailedTip borderBox hide">您输入的内容有误</div>
            <div class="addToBook pointer" title="添加到单词本" name="addToBook">添加到单词本</div>
            <div class="wordError hide">
                <div>您可能要找的是：</div>
                <div class="wordPossibility"></div>
            </div>
        """
        return html

    # 设置缓存节点
    setSomeDom: () ->
        @wordContain = @contain.querySelector '.wordContain'
        @word = @contain.querySelector '.word'
        @pron = @contain.querySelector '.pron'
        @wordPlay = @contain.querySelector '.wordPlay'
        @wordExplain = @contain.querySelector '.wordExplain p'
        @audio = @contain.querySelector '.wordPlayAudio'
        @wordError = @contain.querySelector '.wordError'
        @wordPossibility = @contain.querySelector '.wordPossibility'
        @audioBtn = @contain.querySelector '.wordPlayIcon'
        @addToBook = @contain.querySelector '.addToBook'
        @wordFailedTip = @contain.querySelector '.wordFailedTip'
        return @

    # 数据渲染
    renderExplain: () ->
        # 搜索结果正确
        if @data.content and !@data.error
            @word.textContent = @data.content
            @pron.textContent = @data.pron and '/' + @data.pron + '/'
            @data.audio or @addClass @wordPlay, 'hide'
            @data.audio and @removeClass @wordPlay, 'hide'
            @audio.src = @data.audio
            @wordExplain.innerHTML = @data.definition.replace(/\n/g, "<br>")
            @data.sort isnt 'enAnalysis' and @addClass @addToBook, 'hide'
        else
            if @data.error
                @removeClass @wordError, 'hide'
                @wordPossibility.innerHTML = @data.error
            else
                @removeClass @addToBook, 'hide'
                @removeClass @wordFailedTip, 'hide'
            @addClass @wordContain, 'hide'

    # 事件绑定
    eventBind: () ->
        # 播放按钮点击事件注册
        @audioBtn.addEventListener 'click', () =>
            @audio.play()
            @addClass @audioBtn, "audioPlay"
        # 播放结束事件注册
        @audio.addEventListener 'ended', () =>
            @removeClass @audioBtn, "audioPlay"
        # 添加到单词本点击事件注册
        @addToBook.addEventListener 'click', () =>
            exist = @ufWords.objSet[@data.content]
            if exist
                alert '该单词已经存在'
            else
                @ufWords.objSet[@data.content] =
                    count: 0
                    used: false
                @ufWords.arrSet.push @data.content
                @ufWords.allCount += 1
                wordBook.saveSettings 'words', @ufWords, 'unfamiliarBook.json'
                alert '添加成功'
        # 容器对象点击事件注册
        @wordError.addEventListener 'click', (e) =>
            e = e.target
            n = e.getAttribute 'name'
            if 'reSearch' is n
                v = e.textContent
                @publish 'reSearch', v

module.exports = SearchResult
