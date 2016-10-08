wordBook = require './WordBook'

class UnfamiliarBook extends wordBook

    # 构造函数
    constructor: (selector, key) ->
        super selector, key

    # 设置当天练习单词任务
    setOneDayMission: () ->
        now = new Date()
        if @words
            missionTime = @currentBook.time
            if !missionTime or @compareDate(now, (new Date(missionTime)))
                index = @words.hasLearningWordCount
                targetIndex = @words.learningNewWordCount
                wordObj = @words.objSet
                wordArr = @words.arrSet
                t = wordArr.slice index, index + targetIndex
                @currentBook['arrSet'] = t
                @currentBook['arrSetScore'] = []
                @currentBook['allCount'] = t.length
                @currentBook['learningNewWordCount'] = t.length
                @currentBook['hasLearningWordCount'] = 0
                @currentBook['time'] = now
                @wordBook.saveSettings 'learningMission', @currentBook

    # 重载
    getWords: () ->
        @words = @wordBook.readSettings 'words', 'unfamiliarBook.json'
        @currentBook = @wordBook.readSettings 'learningMission', 'unfamiliarBook.json'
        return @

    # 重载
    template: () ->
        @setOneDayMission()
        book = document.createElement 'div'
        book.setAttribute 'class', 'unfamiliarBook borderBox'
        book.innerHTML = """
            <div class="bookName fl">陌生单词本</div>
            <div class="todayWords fl" title="单词数量">
                <div class="twCount">#{@currentBook.allCount}</div>
                <div class="twName">单词数量</div>
            </div>
            <div class="newWords fl" title="新词数">
                <div class="nCount">#{@currentBook.allCount - @currentBook.hasLearningWordCount}</div>
                <div class="nName">新词数</div>
            </div>
            <div class="finishWords fl" title="已完成">
                <div class="fCount">#{@currentBook.hasLearningWordCount}</div>
                <div class="fName">已完成</div>
            </div>
            <div class="divider fl"></div>
            <div class="beginLearning fl pointer" title="开始学习">开始</div>
        """
        return book

    # 判断日期是否为新的一天
    compareDate: (past, current) ->
        if past instanceof Date and current instanceof Date
            pY = past.getYear()
            pM = past.getMonth()
            pD = past.getDate()
            cY = current.getYear()
            cM = current.getMonth()
            cD = current.getDate()
            if pY < cY
                return true
            else
                if pM < cM
                    return true
                else
                    if pD < cD
                        return true
                    else
                        return false
        else
            console.log 'param error'
            return false

module.exports = UnfamiliarBook
