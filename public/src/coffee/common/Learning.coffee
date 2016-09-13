Component = require './Component'
wordBook = require '../../../main/fileController'

class LearningPage extends Component.Components

    # 构造函数
    constructor: (selector) ->
        super selector
        @init()

    # 初始化
    init: () ->
        @key = localStorage.getItem 'currentBook'
        @words = wordBook.readSettings 'words', 'unfamiliarBook.json'
        @learningMission = wordBook.readSettings 'learningMission', 'unfamiliarBook.json'
        @fWords = wordBook.readSettings 'words', 'familiarBook.json'
        if 'unfamiliarBook' is @key then @currentBook = @learningMission else @currentBook = @fWords
        @index = @currentBook.hasLearningWordCount

    # 设置数据
    setData: (data) ->
        if "object" is typeof data
            @data = data
        return @

    # 设置某些缓存节点
    setSomeDom: () ->
        @restWordCount = @contain.querySelector '.restWordCount'
        @word = @contain.querySelector '.word'
        @pron = @contain.querySelector '.pron'
        @wordPlay = @contain.querySelector '.wordPlay'
        @wordExplain = @contain.querySelector '.wordExplain p'
        @audio = @contain.querySelector '.wordPlayAudio'
        @audioBtn = @contain.querySelector '.wordPlayIcon'
        @addToBook = @contain.querySelector '.addToBook'
        @realize = @contain.querySelector '.realize'
        @unrealize = @contain.querySelector '.unrealize'
        @next = @contain.querySelector '.next'
        return @

    #渲染
    render: () ->
        @addClass @contain, 'hide'
        @contain.innerHTML = @template()
        @setSomeDom()
            .eventBind()
            .eventSubscribe()
            .nextWord()

    # 模版
    template: () ->
        html = """
            <div class="restWordCount"></div>
            <div class="wordContainTop borderBox">
                <div class="wordInfo fl">
                    <div class="word fl" title="单词"></div>
                    <div class="pron fl" title="拼注"></div>
                </div>
                <div class="wordPlay fl">
                    <span class="wordPlayIcon pointer" name="wordPlay" title="播放"></span>
                    <audio class="wordPlayAudio" src=""></audio>
                </div>
            </div>
            <div class="wordExplain borderBox fl">
                <p class="hide" title="单词释义"></p>
            </div>
            <div class="realize pointer" name="realize" title="认识该单词">认识</div>
            <div class="unrealize pointer" name="unrealize" title="不认识该单词">不认识</div>
            <div class="next pointer hide" name="next" title="下一个">下一个</div>
        """
        return html

    # 下一个单词
    nextWord: () ->
        if @index < @currentBook['allCount']
            word = @currentBook['arrSet'][@index]
            _topBanner.getExplain word, 'learning'
            @index++
        else
            @updateRecord()
            alert '已经没有单词了'

    # 保存学习进度
    savePlan: (score) ->
        @currentBook.hasLearningWordCount = @index
        score and (scoreArr = @currentBook.arrSetScore) and scoreArr.push score
        if 'unfamiliarBook' is @key
            wordBook.saveSettings "learningMission", @currentBook, "unfamiliarBook.json"
        else if 'familiarBook' is @key
            if @currentBook.hasLearningWordCount is @currentBook.allCount
                @currentBook.hasLearningWordCount = 0
            wordBook.saveSettings "words", @currentBook, "familiarBook.json"
            console.log 'familiarBook'

    # 更新当天学习记录
    updateRecord: () ->
        if 'unfamiliarBook' is @key
            familiarWord = []
            wObjSet = @words.objSet
            wArrSet = @words.arrSet
            wHasLearning = @words.hasLearningWordCount
            lArrSet = @learningMission.arrSet
            lScoreArr = @learningMission.arrSetScore
            lHasLearning = @learningMission.hasLearningWordCount
            @words.hasLearningWordCount += lHasLearning
            if @words.hasLearningWordCount is @words.allCount
                @words.hasLearningWordCount = 0
            pos = 0
            (
                w = lArrSet[i]
                s = lScoreArr[i]
                wObjSet[w]['count'] += s
                if wObjSet[w]['count'] < 0 then wObjSet[w]['count'] = 0
                if wObjSet[w]['count'] >= 3
                     familiarWord.push w
                     if 0 is wHasLearning + i
                         wArrSet = wArrSet.slice wHasLearning + i + 1
                     else
                         t1 = wArrSet.slice 0, wHasLearning + i - pos
                         t2 = wArrSet.slice wHasLearning + i + 1 - pos
                         wArrSet = t1.concat t2
                     @words.allCount--
                     pos++
                     delete wObjSet[w]
            ) for i in [0..lHasLearning - 1 ]
            @words.arrSet = wArrSet
            wordBook.saveSettings "words", @words, "unfamiliarBook.json"
            fWords = wordBook.readSettings "words", "familiarBook.json"
            fWords.allCount += familiarWord.length
            fWords.arrSet.concat familiarWord
            (
                w = familiarWord[i]
                fWords.objSet[w] or fWords.objSet[w] = {count: 0}
            ) for i in [0..familiarWord.length - 1]
            wordBook.saveSettings "words", fWords, "familiarBook.json"
        else if 'familiarBook' is @key
            console.log 'familiarBook'

    # 数据渲染
    renderExplain: () ->
        if @data.content
            @removeClass @contain, 'hide'
            @removeClass @realize, 'hide'
            @removeClass @unrealize, 'hide'
            @addClass @wordExplain, 'hide'
            @addClass @next, 'hide'
            @restWordCount.textContent = @index + '/' + @currentBook.allCount
            @word.textContent = @data.content
            @pron.textContent = '/' + @data.pron + '/'
            @data.audio or @addClass @wordPlay, 'hide'
            @data.audio and @removeClass @wordPlay, 'hide'
            @audio.src = @data.audio
            @wordExplain.innerHTML = @data.definition.replace(/\n/, "<br>")

    # 更多解释
    showMoreExplain: () ->
        @addClass @realize, 'hide'
        @addClass @unrealize, 'hide'
        @removeClass @next, 'hide'
        @removeClass @wordExplain, 'hide'

    # 事件绑定
    eventBind: () ->
        @contain.addEventListener 'click', (e) =>
            e = e.target
            n = e.getAttribute 'name'
            if "wordPlay" is n
                @audio.play()
                @addClass @audioBtn, "audioPlay"
            else if "realize" is n
                @showMoreExplain()
                @savePlan(1)
            else if "next" is n
                @nextWord()
            else if "unrealize" is n
                @showMoreExplain()
                @savePlan(-1)
        @audio.addEventListener 'ended', () =>
            @removeClass @audioBtn, "audioPlay"
        return @

    # 事件订阅
    eventSubscribe: () ->
        _topBanner.subscribe 'getExplain_learning', (publisher, type, data) =>
            @setData data
            @renderExplain()
        return @

module.exports = LearningPage
