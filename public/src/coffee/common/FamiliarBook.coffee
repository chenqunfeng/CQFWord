wordBook = require './WordBook'

class FamiliarBook extends wordBook

    # 构造函数
    constructor: (selector, key) ->
        super selector, key

    # 重载
    getWords: () ->
        @currentBook = @wordBook.readSettings 'words', 'familiarBook.json'
        return @

    # 重载
    template: () ->
        book = document.createElement 'div'
        book.setAttribute 'class', 'familiarBook borderBox'
        book.innerHTML = """
            <div class="bookName fl">熟悉单词本</div>
            <div class="todayWords fl" title="单词数量">
                <div class="twCount">#{@currentBook.allCount}</div>
                <div class="twName">已掌握单词</div>
            </div>
            <div class="divider fl"></div>
            <div class="beginLearning fl pointer" title="开始学习">回顾复习</div>
        """
        return book

module.exports = FamiliarBook
