Component = require './Component'
Common = require './Common'

class TopBanner extends Component.Components

    # 构造函数
    constructor: (selector) ->
        super selector
        @init()

    # 初始化
    init: () ->
        console.log "init"

    # 渲染
    render: () ->
        @contain.innerHTML = @template()
        @eventBind()

    # 模版
    template: () ->
        html = """
            <div class="logo fl pointer" title="主页"></div>
            <div class="searchContain fl" title="搜索框">
                <span class="searchIcon fl"></span>
                <input class="search fl" type="text" autofocus="autofocus" placeholder="搜索单词">
            </div>
            <div class="confirm fl pointer" title="确定">
                确定
            </div>
        """
        return html

    # 事件绑定
    eventBind: () ->
        logo = @contain.querySelector '.logo'
        input = @contain.querySelector '.search'
        confirm = @contain.querySelector '.confirm'
        document.addEventListener 'keydown', (e) =>
            if 13 is e.keyCode
                # ipcRenderer.send('change-search-window')
                if (v = input.value)
                    @getExplain v
        confirm.addEventListener 'click', () =>
            # ipcRenderer.send('change-search-window')
            if (v = input.value)
                @getExplain v
        logo.addEventListener 'click', () =>
            ipcRenderer.send('change-index-window')

    # 中文解析
    chAnalysis: (data) ->
        if (def = data.definition)
            p1 = /(<p[^>]*>|<span[^>]+>|<\/span>|<a[^>]*>|<\/a>|[\n]|[0-9\u4e00-\u9fa5])/g
            p2 = /<\/p>/g
            data.definition = def.replace(p1, "").replace(p2, "\n")
        else
            data.definition = "暂无更多释义"
        data.audio = ""
        return data

    # 英文解析
    enAnalysis: (data) ->
        if (def = data.definition)
            p1 = /([\n]|<ul>|<\/ul>|<li>)/g
            p2 = /<\/li>/g
            data.definition = def.replace(p1, "").replace(p2, "\n")
        else
            data.definition = "暂无更多释义"
        if (error = data.error)
            p1 = /(<span[^>]*>|<\/span>|[\n])/g
            p2 = /<a[^>]*>/g
            data.error = error.replace(p1, "").replace(p2, "<a class='reSearch pointer' name='reSearch'>")
        data.audio = "http://dict.youdao.com/dictvoice?audio=#{data.content}"
        return data

    # 解析总入口
    analysis: (html, v) ->
        if Common.isCh v
            fun = "chAnalysis"
        else if Common.isEn v
            fun = "enAnalysis"
        if fun
            data = {}
            table =
                content: /<span.*class="keyword">(.+?)<\/span>/
                pron: /<span.*class="phonetic">(.+?)<\/span>/
                definition: /<div class="trans-container">([\s\S]+?)<\/div>/
                error: /<p class="typo-rel">([\s\S]+?)<\/p>/
            for key of table
                p = table[key]
                c = html.match p
                c and data[key] = c[1]
                c or data[key] = ""
            # 解析单词解析
            data['sort'] = fun
            return @[fun](data)

    # 获取单词解释
    # @param {string} v       需要查询的词
    # @param {string} postfix 区分调用入口
    getExplain: (v, postfix) ->
        Common.loading()
        url = "http://youdao.com/w/#{v}"
        fetch(url).then (response) =>
          response.text().then (html) =>
            t = "getExplain"
            if postfix
                t = t + '_' + postfix
            Common.loaded()
            data = @analysis html, v
            @publish t, data


module.exports = TopBanner
